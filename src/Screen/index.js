import * as Animatable from 'react-native-animatable'
import React from 'react'

import animator from './animator'
import commonStyle from './style'

class Screen extends React.Component {
  state = { removing: false, resolveRemoving: null }

  componentDidMount = () => {
    const { animation: { type, duration, easing }, registerScreen } = this.props
    registerScreen({ remove: this.remove })
    !!type ? this.view.transitionTo(animator(type).end, duration, easing) : this.props.onActionFinished()
  }

  remove = ({ type, duration, easing }, resolveRemoving) => {
    if (!type) return this.props.removeScreen(resolveRemoving)
    this.setState({ removing: true, resolveRemoving }, () =>
      this.view.transitionTo(animator(type).start, duration, easing)
    )
  }

  onTransitionEnd = () =>
    this.state.removing ? this.props.removeScreen(this.state.resolveRemoving) : this.props.onActionFinished()

  render = () => {
    const style = { ...commonStyle, ...animator(this.props.animation.type).start }
    return (
      <Animatable.View style={style} onTransitionEnd={this.onTransitionEnd} ref={ref => (this.view = ref)}>
        {this.props.route}
      </Animatable.View>
    )
  }
}

export default Screen
