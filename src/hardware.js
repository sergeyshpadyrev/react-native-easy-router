import { BackHandler } from 'react-native'

export default class HardwareBack {
  constructor(router, disabled) {
    this.router = router
    this.disabled = disabled
  }

  handle = () => {
    if (this.router.stack.length > 1) this.router.pop()
    return true
  }

  subscribe = () => {
    if (!this.disabled) BackHandler.addEventListener('hardwareBackPress', this.handle)
  }

  unsubscribe = () => {
    if (!this.disabled) BackHandler.removeEventListener('hardwareBackPress', this.handle)
  }
}
