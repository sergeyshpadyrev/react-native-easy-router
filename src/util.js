import Animation from './animation'

export const mapByKey = (object, mapper) => Object.assign(...Object.keys(object).map(key => ({ [key]: mapper(key) })))
export const prepareAnimation = animation => ({ animation: { ...Animation.default, ...animation } })
