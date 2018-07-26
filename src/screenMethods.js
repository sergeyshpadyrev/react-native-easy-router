import Animation from './animation'

export default class ScreenMethods {
  constructor(router, screen, index) {
    this.popTo = animation =>
      router.actions.add(onFinish => {
        const removeLast = () => {
          const lastScreen = router.state.stack[router.state.stack.length - 1].screen
          const onAnimationFinish = () => router.setState({ stack: router.state.stack.slice(0, -1) }, onFinish)
          lastScreen.animateOut(animation).then(onAnimationFinish)
        }

        const stack = [...router.state.stack.slice(0, index + 1), router.state.stack[router.state.stack.length - 1]]
        router.setState({ stack }, removeLast)
      })
  }
}
