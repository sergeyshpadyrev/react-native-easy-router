import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const defaultAnimation = { type: 'right', duration: 300, easing: 'ease' }
const types = {
  none: [{}, {}],
  fade: [{ opacity: 0 }, { opacity: 1 }],

  left: [{ left: -width }, { left: 0 }],
  right: [{ left: width }, { left: 0 }],

  bottom: [{ top: height }, { top: 0 }],
  top: [{ top: -height }, { top: 0 }]
}

export default {
  withDefault: animation => ({ ...defaultAnimation, ...animation }),
  start: type => types[type][0],
  end: type => types[type][1]
}
