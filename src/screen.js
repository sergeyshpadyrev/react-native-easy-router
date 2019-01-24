import * as Animatable from 'react-native-animatable-promise'
import React from 'react'
import styles from './styles'

const transitions = (transition, previous, stack) =>
  stack.map(({ screen }, i) => {
    if (i === stack.length - 1) return transition
    if (i === stack.length - 2) return previous(screen)
    return screen.transparent()
  })

export default class Screen extends React.Component {
  animateIn = stack => {
    const { type, duration, easing } = this.props.animator.withDefault(this.props.animation)
    if (type === 'none') return Promise.resolve()
    const transition = this.view.transitionTo(this.props.animator.end(type), duration, easing)
    if (!this.props.animator.shouldFade(type)) return transition
    return Promise.all(transitions(transition, screen => screen.fadeOut(duration, easing), stack))
  }

  animateOut = (animation, stack) => {
    const { type, duration, easing } = this.props.animator.withDefault({
      ...this.props.animation,
      ...animation
    })
    if (type === 'none') {
      if (stack.length >= 2 && stack[stack.length - 1].props.animation.type === 'none') stack[stack.length - 2].screen.fadeIn()
      return Promise.resolve()
    }
    const transition = this.view.transitionTo(this.props.animator.start(type), duration, easing)
    if (!this.props.animator.shouldFade(type)) return transition
    return Promise.all(transitions(transition, screen => screen.fadeIn(duration, easing), stack))
  }

  fadeIn = (duration, easing) => this.view.transitionTo(this.props.animator.end('fade'), duration, easing)

  fadeOut = (duration, easing) => this.view.transitionTo(this.props.animator.start('fade'), duration, easing)

  transparent = () => this.view.transitionTo({ opacity: 0 }, 0)

  render = () => {
    const { type } = this.props.animator.withDefault(this.props.animation)
    const style = { ...styles.screen, ...this.props.animator.start(type) }
    const useNativeDriver = this.props.animator.useNativeDriver(type)
    return (
      <Animatable.View pointerEvents="box-none" style={style} ref={view => (this.view = view)} useNativeDriver={useNativeDriver}>
        {this.props.children}
      </Animatable.View>
    )
  }
}
