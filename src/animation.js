import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default {
  default: { type: 'right', duration: 300, easing: 'ease' },
  types: {
    none: [{}, {}],
    fade: [{ opacity: 0 }, { opacity: 1 }],

    left: [{ left: -width }, { left: 0 }],
    right: [{ left: width }, { left: 0 }],

    bottom: [{ top: height }, { top: 0 }],
    top: [{ top: -height }, { top: 0 }]
  }
}
