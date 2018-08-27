import { BackHandler } from 'react-native'

export default class HardwareBack {
  constructor(methods, disabled) {
    this.methods = methods
    this.disabled = disabled
  }

  handle = () => {
    if (this.methods.stack.length > 1) {
      this.methods.pop()
      return true
    }
    return false
  }

  subscribe = () => {
    if (!this.disabled) BackHandler.addEventListener('hardwareBackPress', this.handle)
  }

  unsubscribe = () => {
    if (!this.disabled) BackHandler.removeEventListener('hardwareBackPress', this.handle)
  }
}
