import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const defaultAnimation = { type: 'right', duration: 300, easing: 'ease' }
const types = {
  none: [{}, {}, true],
  fade: [{ opacity: 0 }, { opacity: 1 }, true],

  left: [{ transform: [{ translateX: -width }] }, { transform: [{ translateX: 0 }] }, true],
  right: [{ transform: [{ translateX: width }] }, { transform: [{ translateX: 0 }] }, true],

  bottom: [{ transform: [{ translateY: height }] }, { transform: [{ translateY: 0 }] }, true],
  top: [{ transform: [{ translateY: -height }] }, { transform: [{ translateY: 0 }] }, true]
}

export default {
  withDefault: animation => ({ ...defaultAnimation, ...animation }),
  start: type => types[type][0],
  end: type => types[type][1],
  useNativeDriver: type => types[type][2]
}
