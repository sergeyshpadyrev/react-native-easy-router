import Actions from './actions'
import Animation from './animation'
import Hardware from './hardware'
import React from 'react'
import Screen from './screen'
import styles from './styles'
import { View } from 'react-native'

class Router extends React.Component {
  actions = new Actions()
  state = { stack: [] }

  forAllRoutes = mapper => Object.assign(...Object.keys(this.props.routes).map(route => ({ [route]: mapper(route) })))
  router = {
    pop: animation =>
      this.actions.add(onFinish => {
        console.log(JSON.stringify(this.state.stack.screen))
        if (this.state.stack.length > 0)
          this.state.stack[this.state.stack.length - 1].screen.remove(animation, onFinish)
      }),
    push: this.forAllRoutes(route => (params, animation) =>
      this.actions.add(onFinish => this.addScreen(route, params, animation, onFinish))
    ),
    replace: this.forAllRoutes(route => (params, animation) =>
      this.actions.add(onFinish => {
        const removeReplacedScreen = () => {
          const cut = array => [...array.slice(0, -2), array[array.length - 1]]
          this.setState({ stack: cut(this.state.stack) }, onFinish)
        }
        this.addScreen(route, params, animation, removeReplacedScreen, 1)
      })
    ),
    reset: this.forAllRoutes(route => (params, animation) =>
      this.actions.add(onFinish => {
        const removeAllScreens = () => {
          const cut = array => [array[array.length - 1]]
          this.setState({ stack: cut(this.state.stack) }, onFinish)
        }
        this.addScreen(route, params, animation, removeAllScreens, this.state.stack.length)
      })
    )
  }
  hardware = new Hardware(this.router, this.props.disableHardwareBack)

  addScreen = (route, params, animation, onActionFinished, idShift = 0) => {
    const id = this.state.stack.length - idShift
    const pop = animation =>
      this.actions.add(onFinish => {
        const cut = array => [...array.slice(0, id + 1), array[array.length - 1]]
        const pop = () => this.state.stack[this.state.stack.length - 1].screen.remove(animation, onFinish)
        return this.setState({ stack: cut(this.state.stack) }, pop)
      })
    const details = { id, route, params: { ...params }, pop }
    const Route = this.props.routes[route]
    const screen = (
      <Screen
        animation={Animation.withDefault(animation)}
        key={`${id}-${route}-${parseInt(Math.random() * 10000)}`}
        removeScreen={this.state.stack.length > 0 ? this.removeScreen : undefined}
        registerScreen={methods => {
          this.setState({
            stack: [
              ...this.state.stack.slice(0, -1),
              { ...this.state.stack[this.state.stack.length - 1], screen: { ...methods, details } }
            ]
          })
        }}
        route={<Route router={this.router} {...params} />}
        onActionFinished={onActionFinished}
      />
    )
    this.setState({ stack: [...this.state.stack, screen] })
  }

  removeScreen = resolve => this.setState({ stack: this.state.stack.slice(0, -1) }, resolve)

  componentWillMount = () => {
    Object.defineProperty(this.router, 'stack', {
      get: function() {
        return this.state.stack.map(route => route.screen.details)
      }.bind(this)
    })

    if (this.props.routerRef) this.props.routerRef(this.router)

    this.addScreen(this.props.initialRoute, {}, { type: 'none' })
    this.hardware.subscribe()
  }

  componentWillUnmount = () => this.hardware.unsubscribe()

  render = () => <View style={styles.router}>{this.state.stack}</View>
}

export default Router
