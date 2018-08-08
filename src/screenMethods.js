import Animation from './animation'

export default class ScreenMethods {
  constructor(router, screen, index) {
    const forAllRoutes = mapper =>
      Object.assign(...Object.keys(router.props.routes).map(route => ({ [route]: mapper(route) })))

    this.pop = animation =>
      router.actions.add(onFinish => {
        const removeLast = () => {
          const lastScreen = router.state.stack[router.state.stack.length - 1].screen
          const onAnimationFinish = () => router.setStack({ stack: router.state.stack.slice(0, -1) }, onFinish)
          lastScreen.animateOut(animation).then(onAnimationFinish)
        }

        const stack = [...router.state.stack.slice(0, index + 1), router.state.stack[router.state.stack.length - 1]]
        router.setStack({ stack }, removeLast)
      })

    this.replace = forAllRoutes(route => (params, animation) =>
      router.actions.add(onFinish => {
        const onAdd = () => {
          const stack = [...router.state.stack.slice(0, index), router.state.stack[router.state.stack.length - 1]]
          router.setStack({ stack }, onFinish)
        }
        router.addScreen(route, params, animation, onAdd, router.state.stack.length - index)
      })
    )
  }
}
