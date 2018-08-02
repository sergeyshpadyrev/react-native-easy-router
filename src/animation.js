import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const defaultAnimation = { type: 'right', duration: 300, easing: 'ease' }
const types = {
  none: [{}, {}],
  fade: [{ opacity: 0 }, { opacity: 1 }],

  left: [{ transform: [{ translateX: -width }] }, { transform: [{ translateX: 0 }] }],
  right: [{ transform: [{ translateX: width }] }, { transform: [{ translateX: 0 }] }],

  bottom: [{ transform: [{ translateY: height }] }, { transform: [{ translateY: 0 }] }],
  top: [{ transform: [{ translateY: -height }] }, { transform: [{ translateY: 0 }] }]
}

export default {
  withDefault: animation => ({ ...defaultAnimation, ...animation }),
  start: type => types[type][0],
  end: type => types[type][1]
}
