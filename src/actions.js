export default class ActionMachine {
  actions = []
  currentAction = null

  add = process =>
    new Promise(resolve => {
      this.actions = [...this.actions, { process, resolve }]
      this.process()
    })

  process = () => {
    if (!!this.currentAction || !this.actions.length) return

    this.currentAction = this.actions[0]
    this.actions = this.actions.slice(1)

    this.currentAction.process(() => {
      this.currentAction.resolve()
      this.currentAction = null
      this.process()
    })
  }
}
