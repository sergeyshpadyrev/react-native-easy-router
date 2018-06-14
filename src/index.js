import React from 'react'
import { View } from 'react-native'

import { mapByKey, prepareAnimation } from './util'
import Screen from './Screen'

class Router extends React.Component {
  actions = []
  actionProcessing = false
  screens = []
  state = { stack: [] }

  router = {
    pop: animation => this.addAction({ type: 'pop' }, animation),
    push: mapByKey(this.props.routes, route => (params, animation) =>
      this.addAction({ type: 'push', route, params }, animation)
    ),
    replace: mapByKey(this.props.routes, route => (params, animation) =>
      this.addAction({ type: 'replace', route, params }, animation)
    )
  }

  addScreen = (route, params, animation, onActionFinished = this.onActionFinished, idShift = 0) => {
    const id = this.state.stack.length - idShift
    const pop = animation => this.addAction({ type: 'popTo', id }, animation)
    const details = { id, route, params: { ...params }, pop }
    const Route = this.props.routes[route]
    const screen = (
      <Screen
        animation={animation}
        key={`${id}-${route}`}
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
    this.setState({ stack: this.state.stack.slice(0, -1) }, () => {
      resolve()
      this.onActionFinished()
    })
  }

  addAction = (action, animation) =>
    new Promise(resolve => {
      this.actions = [...this.actions, { ...action, ...prepareAnimation(animation), resolve }]
      this.startAction()
    })

  startAction = () => {
    if (this.actionProcessing || this.actions.length === 0) return

    const [action, ...restActions] = this.actions

    this.actionProcessing = true
    this.actions = restActions

    if (['pop', 'popTo'].includes(action.type) && this.screens.length === 0) return

    switch (action.type) {
      case 'pop':
        return this.screens[this.screens.length - 1].remove(action.animation, action.resolve)
      case 'popTo':
        const cut = array => [...array.slice(0, parseInt(action.id) + 1), array[array.length - 1]]
        const pop = () => this.screens[this.screens.length - 1].remove(action.animation, action.resolve)
        this.screens = cut(this.screens)
        return this.setState({ stack: cut(this.state.stack) }, pop)
      case 'push':
        const onActionFinished = () => {
          action.resolve()
          this.onActionFinished()
        }
        return this.addScreen(action.route, action.params, action.animation, onActionFinished)
      case 'replace':
        const removeReplacedScreen = () => {
          const cut = array => [...array.slice(0, -2), array[array.length - 1]]
          this.screens = cut(this.screens)
          this.setState({ stack: cut(this.state.stack) }, () => {
            action.resolve()
            this.onActionFinished()
          })
        }
        return this.addScreen(action.route, action.params, action.animation, removeReplacedScreen, 1)
    }
  }

  onActionFinished = () => {
    this.actionProcessing = false
    this.startAction()
  }

  componentWillMount = () => {
    Object.defineProperty(this.router, 'stack', {
      get: function() {
        return this.screens.map(screen => screen.details)
      }.bind(this)
    })

    this.props.routerRef(this.router)
    this.addScreen(this.props.initialRoute, {}, {})
  }

  render = () => this.state.stack
}

export default Router
