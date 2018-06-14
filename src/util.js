export const mapByKey = (object, mapper) => Object.assign(...Object.keys(object).map(key => ({ [key]: mapper(key) })))

const defaultAnimation = { type: 'right', duration: 300, easing: 'ease' }
export const prepareAnimation = animation => ({ animation: { ...defaultAnimation, ...animation } })
