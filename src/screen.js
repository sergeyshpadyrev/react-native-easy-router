import * as Animatable from 'react-native-animatable-promise'
import Animation from './animation'
import React from 'react'
import styles from './styles'

export default class Screen extends React.Component {
  animateIn = () => {
    const { type, duration, easing } = Animation.withDefault(this.props.animation)
    if (type === 'none') return Promise.resolve()
    return this.view.transitionTo(Animation.end(type), duration, easing)
  }

  animateOut = animation => {
    const { type, duration, easing } = Animation.withDefault(animation)
    if (type === 'none') return Promise.resolve()
    return this.view.transitionTo(Animation.start(type), duration, easing)
  }

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
