export default class Router {
  constructor(router) {
    Object.defineProperty(this, 'stack', { get: () => router.state.stack.map(route => route.methods) })

    const forAllRoutes = mapper =>
      Object.assign(...Object.keys(router.props.routes).map(route => ({ [route]: mapper(route) })))

    this.pop = animation =>
      router.actions.add(onFinish => {
        if (router.state.stack.length === 0) return

        router.state.stack[router.state.stack.length - 1].screen
          .animateOut(animation)
          .then(() => router.setStack({ stack: router.state.stack.slice(0, -1) }, onFinish))
      })

    this.push = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => router.addScreen(route, params, animation, onFinish))
    )

    this.replace = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => {
        const removeReplacedScreen = () =>
          router.setStack(
            { stack: [...router.state.stack.slice(0, -2), router.state.stack[router.state.stack.length - 1]] },
            onFinish
          )
        router.addScreen(route, params, animation, removeReplacedScreen, 1)
      })
    )

    this.reset = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => {
        const removeAllScreens = () =>
          router.setStack({ stack: [router.state.stack[router.state.stack.length - 1]] }, onFinish)
        router.addScreen(route, params, animation, removeAllScreens, router.state.stack.length)
      })
    )
  }
}
