import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const defaultAnimation = { type: 'right', duration: 300, easing: 'ease' }
const types = {
  none: [{}, {}, true],
  fade: [{ opacity: 0 }, { opacity: 1 }, true],

  left: [{ transform: [{ translateX: -width }] }, { transform: [{ translateX: 0 }] }, true],
  'left-bottom': [
    { transform: [{ translateX: -width }, { translateY: height }] },
    { transform: [{ translateX: 0 }, { translateY: 0 }] },
    true
  ],
  'left-top': [
    { transform: [{ translateX: -width }, { translateY: -height }] },
    { transform: [{ translateX: 0 }, { translateY: 0 }] },
    true
  ],

  right: [{ transform: [{ translateX: width }] }, { transform: [{ translateX: 0 }] }, true],
  'right-bottom': [
    { transform: [{ translateX: width }, { translateY: height }] },
    { transform: [{ translateX: 0 }, { translateY: 0 }] },
    true
  ],
  'right-top': [
    { transform: [{ translateX: width }, { translateY: -height }] },
    { transform: [{ translateX: 0 }, { translateY: 0 }] },
    true
  ],

  bottom: [{ transform: [{ translateY: height }] }, { transform: [{ translateY: 0 }] }, true],
  top: [{ transform: [{ translateY: -height }] }, { transform: [{ translateY: 0 }] }, true]
}
const getTypeProperty = index => type => (Array.isArray(type) ? type : types[type])[index]

export default {
  withDefault: animation => ({ ...defaultAnimation, ...animation }),
  start: getTypeProperty(0),
  end: getTypeProperty(1),
  useNativeDriver: getTypeProperty(2)
}
