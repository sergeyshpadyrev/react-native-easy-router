import Animation from './animation'

export const prepareAnimation = animation => ({ animation: { ...Animation.default, ...animation } })
