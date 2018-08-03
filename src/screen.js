import * as Animatable from 'react-native-animatable-promise'
import Animation from './animation'
import React from 'react'
import styles from './styles'

const shouldFade = type => {
  const { opacity, transform } = Animation.start(type)
  return opacity === undefined || transform !== undefined
}

const transitions = (transition, previous, stack) => {
  return stack.map(({ screen }, i) => {
    if (i === stack.length - 1) return transition
    if (i === stack.length - 2) return previous(screen)
    return screen.transparent()
  })
}

export default class Screen extends React.Component {
  animateIn = stack => {
    const { type, duration, easing } = Animation.withDefault(this.props.animation)
    if (type === 'none') return Promise.resolve()
    const transition = this.view.transitionTo(Animation.end(type), duration, easing)
    if (!shouldFade(type)) return transition
    return Promise.all(transitions(transition, screen => screen.fadeOut(duration, easing), stack))
  }

  animateOut = (animation, stack) => {
    const { type, duration, easing } = Animation.withDefault({ ...this.props.animation, ...animation })
    if (type === 'none') return Promise.resolve()
    const transition = this.view.transitionTo(Animation.start(type), duration, easing)
    if (!shouldFade(type)) return transition
    return Promise.all(transitions(transition, screen => screen.fadeIn(duration, easing), stack))
  }

  fadeIn = (duration, easing) => this.view.transitionTo(Animation.end('fade'), duration, easing)

  fadeOut = (duration, easing) => this.view.transitionTo(Animation.start('fade'), duration, easing)

  transparent = () => this.view.transitionTo({ opacity: 0 }, 0)

  render = () => {
    const { type } = Animation.withDefault(this.props.animation)
    const style = { ...styles.screen, ...Animation.start(type) }
    return (
      <Animatable.View style={style} ref={view => (this.view = view)}>
        {this.props.children}
      </Animatable.View>
    )
  }
}
