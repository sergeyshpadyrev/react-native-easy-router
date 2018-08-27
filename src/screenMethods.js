import Animation from './animation'

export default class ScreenMethods {
  constructor(router, screen, index) {
    const forAllRoutes = mapper =>
      Object.assign(...Object.keys(router.props.routes).map(route => ({ [route]: mapper(route) })))

    this.pop = animation =>
      router.actions.add(onFinish => {
        const removeLast = () => {
          const lastScreen = router.state.stack[router.state.stack.length - 1].screen
          const newStack = router.state.stack.slice(0, -1)
          const onAnimationFinish = () => router.setStack({ stack: newStack }, onFinish)
          router.setTransition(animation || lastScreen.props.animation, router.state.stack, newStack)
          lastScreen.animateOut(animation, router.state.stack).then(onAnimationFinish)
        }

        const stack = [...router.state.stack.slice(0, index + 1), router.state.stack[router.state.stack.length - 1]]
        router.setStack({ stack }, removeLast)
      })

    this.replace = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => {
        const nextStack = stack => [...stack.slice(0, index), stack[stack.length - 1]]
        const onAdd = stack =>
          router.setStack({ stack: nextStack(stack) }, onFinish)
        router.addScreen(route, params, animation, onAdd, router.state.stack.length - index, nextStack)
      })
    )
  }
}
