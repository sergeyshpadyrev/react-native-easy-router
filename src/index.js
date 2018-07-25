import Actions from './actions'
import Animation from './animation'
import Hardware from './hardware'
import React from 'react'
import Screen from './screen'
import styles from './styles'
import { View } from 'react-native'

class Router extends React.Component {
  actions = new Actions()
  screens = []
  state = { stack: [] }

  forAllRoutes = mapper => Object.assign(...Object.keys(this.props.routes).map(route => ({ [route]: mapper(route) })))
  router = {
    pop: animation =>
      this.actions.add(onFinish => {
        if (this.screens.length > 0) this.screens[this.screens.length - 1].remove(animation, onFinish)
      }),
    push: this.forAllRoutes(route => (params, animation) =>
      this.actions.add(onFinish => this.addScreen(route, params, animation, onFinish))
    ),
    replace: this.forAllRoutes(route => (params, animation) =>
      this.actions.add(onFinish => {
        const removeReplacedScreen = () => {
          const cut = array => [...array.slice(0, -2), array[array.length - 1]]
          this.screens = cut(this.screens)
          this.setState({ stack: cut(this.state.stack) }, onFinish)
        }
        this.addScreen(route, params, animation, removeReplacedScreen, 1)
      })
    ),
    reset: this.forAllRoutes(route => (params, animation) =>
      this.actions.add(onFinish => {
        const removeAllScreens = () => {
          const cut = array => [array[array.length - 1]]
          this.screens = cut(this.screens)
          this.setState({ stack: cut(this.state.stack) }, onFinish)
        }
        this.addScreen(route, params, animation, removeAllScreens, this.screens.length)
      })
    )
  }
  hardware = new Hardware(this.router, this.props.disableHardwareBack)

  addScreen = (route, params, animation, onActionFinished, idShift = 0) => {
    const id = this.screens.length - idShift
    const pop = animation =>
      this.actions.add(onFinish => {
        const cut = array => [...array.slice(0, id + 1), array[array.length - 1]]
        const pop = () => this.screens[this.screens.length - 1].remove(animation, onFinish)
        this.screens = cut(this.screens)
        return this.setState({ stack: cut(this.state.stack) }, pop)
      })
    const details = { id, route, params: { ...params }, pop }
    const Route = this.props.routes[route]
    const screen = (
      <Screen
        animation={Animation.withDefault(animation)}
        key={`${id}-${route}-${parseInt(Math.random() * 10000)}`}
        removeScreen={this.state.stack.length > 0 ? this.removeScreen : undefined}
        registerScreen={methods => (this.screens = [...this.screens, { ...methods, details }])}
        route={<Route router={this.router} {...params} />}
        onActionFinished={onActionFinished}
      />
    )
    this.setState({ stack: [...this.state.stack, screen] })
  }

  removeScreen = resolve => {
    this.screens = this.screens.slice(0, -1)
    this.setState({ stack: this.state.stack.slice(0, -1) }, resolve)
  }

  componentWillMount = () => {
    Object.defineProperty(this.router, 'stack', {
      get: function() {
        return this.screens.map(screen => screen.details)
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
