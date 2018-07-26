import Actions from './actions'
import * as Animatable from 'react-native-animatable-promise'
import Animation from './animation'
import Hardware from './hardware'
import Methods from './methods'
import React from 'react'
import styles from './styles'
import { View } from 'react-native'

class Router extends React.Component {
  actions = new Actions()
  state = { stack: [] }

  router = new Methods(this)
  hardware = new Hardware(this.router, this.props.disableHardwareBack)

  addScreen = (route, params, animation, onActionFinished, idShift = 0) => {
    animation = Animation.withDefault(animation)

    const index = this.state.stack.length - idShift
    const key = `${index}-${route}-${parseInt(Math.random() * 10000)}`
    const pop = animation => {
      animation = Animation.withDefault(animation)
      this.actions.add(onFinish => {
        const pop = () => {
          const lastScreen = this.state.stack[this.state.stack.length - 1]
          const onAnimationFinish = () => this.setState({ stack: this.state.stack.slice(0, -1) }, onFinish)
          lastScreen.reference
            .transitionTo(Animation.start(animation.type), animation.duration, animation.easing)
            .then(onAnimationFinish)
        }

        return this.setState(
          { stack: [...this.state.stack.slice(0, index + 1), this.state.stack[this.state.stack.length - 1]] },
          pop
        )
      })
    }
    const settings = { route, params: { ...params }, pop }
    const Route = this.props.routes[route]

    const referenceHandler = reference => {
      if (!reference) return

      const startInAnimation = () =>
        reference
          .transitionTo(Animation.end(animation.type), animation.duration, animation.easing)
          .then(onActionFinished)

      const previous = this.state.stack.slice(0, -1)
      const last = this.state.stack[this.state.stack.length - 1]
      this.setState({ stack: [...previous, { ...last, settings, reference }] }, startInAnimation)
    }

    const screen = (
      <Animatable.View
        key={key}
        style={{ ...styles.screen, ...Animation.start(animation.type) }}
        ref={referenceHandler}
      >
        <Route router={this.router} {...params} />
      </Animatable.View>
    )
    this.setState({ stack: [...this.state.stack, screen] })
  }

  componentWillMount = () => {
    this.addScreen(this.props.initialRoute, {}, { type: 'none' })
    this.hardware.subscribe()

    if (this.props.router) this.props.router(this.router)
  }

  componentWillUnmount = () => this.hardware.unsubscribe()

  render = () => <View style={styles.router}>{this.state.stack}</View>
}

export default Router
