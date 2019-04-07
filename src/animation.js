import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const defaultAnimation = { type: 'right', duration: 300, easing: 'ease' }
const defaultTypes = {
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

export default class Animator {
  constructor(customAnimationTypes) {
    this.types = { ...defaultTypes, ...customAnimationTypes }
  }
  getTypeProperty = index => type => this.types[type][index]

  withDefault = animation => ({ ...defaultAnimation, ...animation })
  start = this.getTypeProperty(0)
  end = this.getTypeProperty(1)
  useNativeDriver = this.getTypeProperty(2)
  prevOut = this.getTypeProperty(3)
  prevIn = this.getTypeProperty(4)
  shouldFade = type => {
    const { opacity, transform } = this.types[type][0]
    return opacity === undefined || transform !== undefined
  }
}
