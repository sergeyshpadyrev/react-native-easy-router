import * as Animatable from 'react-native-animatable'
import Animation from './animation'
import React from 'react'
import styles from './styles'

class Screen extends React.Component {
  state = { removing: false, resolveRemoving: null }

  componentDidMount = () => {
    const { animation: { type, duration, easing }, registerScreen } = this.props
    registerScreen({ remove: this.remove })
    !!type ? this.view.transitionTo(Animation.end(type), duration, easing) : this.props.onActionFinished()
  }

  remove = (animation, resolveRemoving) => {
    const { type, duration, easing } = Animation.withDefault(animation)
    if (!type) return this.props.removeScreen(resolveRemoving)
    this.setState({ removing: true, resolveRemoving }, () =>
      this.view.transitionTo(Animation.start(type), duration, easing)
    )
  }

  onTransitionEnd = () =>
    this.state.removing ? this.props.removeScreen(this.state.resolveRemoving) : this.props.onActionFinished()

  render = () => (
    <Animatable.View
      style={{ ...styles.screen, ...Animation.start(this.props.animation.type) }}
      onTransitionEnd={this.onTransitionEnd}
      ref={ref => (this.view = ref)}
    >
      {this.props.route}
    </Animatable.View>
  )
}

export default Screen
