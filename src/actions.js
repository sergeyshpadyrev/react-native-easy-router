export default class ActionMachine {
  processing = false

  add = process =>
    new Promise(resolve => {
      if (this.processing) return
      this.processing = true
      process(() => {
        this.processing = false
        resolve()
      })
    })
}
