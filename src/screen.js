import * as Animatable from 'react-native-animatable-promise'
import React from 'react'
import styles from './styles'

export default class Screen extends React.Component {
  animateIn = () => {
    const { type, duration, easing } = this.props.animator.withDefault(this.props.animation)
    if (type === 'none') return Promise.resolve()
    return this.view.transitionTo(this.props.animator.end(type), duration, easing)
  }

  animateOut = animation => {
    const { type, duration, easing, useNativeDriver } = this.props.animator.withDefault({
      ...this.props.animation,
      ...animation
    })
    if (type === 'none') return Promise.resolve()
    return this.view.transitionTo(this.props.animator.start(type), duration, easing)
  }

  render = () => {
    const { type } = this.props.animator.withDefault(this.props.animation)
    const style = { ...styles.screen, ...this.props.animator.start(type) }
    const useNativeDriver = this.props.animator.useNativeDriver(type)
    return (
      <Animatable.View style={style} ref={view => (this.view = view)} useNativeDriver={useNativeDriver}>
        {this.props.children}
      </Animatable.View>
    )
  }
}
