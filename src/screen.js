import * as Animatable from 'react-native-animatable'
import Animation from './animation'
import React from 'react'
import styles from './styles'

class Screen extends React.Component {
  state = { removing: false, resolveRemoving: null }

  componentDidMount = () => {
    const { animation: { type, duration, easing }, registerScreen } = this.props
    registerScreen({ remove: this.remove })
    !!type ? this.view.transitionTo(Animation.types[type][1], duration, easing) : this.props.onActionFinished()
  }

  remove = ({ type, duration, easing }, resolveRemoving) => {
    if (!type) return this.props.removeScreen(resolveRemoving)
    this.setState({ removing: true, resolveRemoving }, () =>
      this.view.transitionTo(Animation.types[type][0], duration, easing)
    )
  }

  onTransitionEnd = () =>
    this.state.removing ? this.props.removeScreen(this.state.resolveRemoving) : this.props.onActionFinished()

  render = () => {
    const style = { ...styles.screen, ...Animation.types[this.props.animation.type][0] }
    return (
      <Animatable.View style={style} onTransitionEnd={this.onTransitionEnd} ref={ref => (this.view = ref)}>
        {this.props.route}
      </Animatable.View>
    )
  }
}

export default Screen
