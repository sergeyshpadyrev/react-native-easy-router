export default class Router {
  constructor(router) {
    Object.defineProperty(this, 'stack', { get: () => router.state.stack.map(route => route.methods) })

    const forAllRoutes = mapper =>
      Object.assign(...Object.keys(router.props.routes).map(route => ({ [route]: mapper(route) })))

    this.pop = animation =>
      router.actions.add(onFinish => {
        if (router.state.stack.length === 0) return

        const newStack = router.state.stack.slice(0, -1)
        const { screen } = router.state.stack[router.state.stack.length - 1]
        router.setTransition(animation || screen.props.animation, router.state.stack, newStack)
        screen.animateOut(animation, router.state.stack).then(() => router.setStack({ stack: newStack }, onFinish))
      })

    this.push = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => router.addScreen(route, params, animation, onFinish))
    )

    this.replace = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => {
        const nextStack = stack => [...stack.slice(0, -2), stack[stack.length - 1]]
        const removeReplacedScreen = stack =>
          router.setStack({ stack: nextStack(stack) }, onFinish)
        router.addScreen(route, params, animation, removeReplacedScreen, 1, nextStack)
      })
    )

    this.reset = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => {
        const nextStack = stack => [stack[stack.length - 1]]
        const removeAllScreens = stack =>
          router.setStack({ stack: nextStack(stack) }, onFinish)
        router.addScreen(route, params, animation, removeAllScreens, router.state.stack.length, nextStack)
      })
    )
  }
}
