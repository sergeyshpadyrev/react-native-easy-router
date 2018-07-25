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
        const cut = array => [...array.slice(0, index + 1), array[array.length - 1]]
        const pop = () =>
          this.state.stack[this.state.stack.length - 1].reference
            .transitionTo(Animation.start(animation.type), animation.duration, animation.easing)
            .then(() => this.setState({ stack: this.state.stack.slice(0, -1) }, onFinish))
        return this.setState({ stack: cut(this.state.stack) }, pop)
      })
    }
    const settings = { route, params: { ...params }, pop }

    const Route = this.props.routes[route]

    const screen = (
      <Animatable.View
        key={key}
        style={{ ...styles.screen, ...Animation.start(animation.type) }}
        ref={reference => {
          if (!!reference)
            this.setState(
              {
                stack: [
                  ...this.state.stack.slice(0, -1),
                  { ...this.state.stack[this.state.stack.length - 1], settings, reference }
                ]
              },
              () =>
                reference
                  .transitionTo(Animation.end(animation.type), animation.duration, animation.easing)
                  .then(onActionFinished)
            )
        }}
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
