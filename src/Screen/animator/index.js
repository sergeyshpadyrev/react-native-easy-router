import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default type => {
  switch (type) {
    case 'bottom':
      return { start: { top: height }, end: { top: 0 } }
    case 'left':
      return { start: { left: -width }, end: { left: 0 } }
    case 'right':
      return { start: { left: width }, end: { left: 0 } }
    case 'top':
      return { start: { top: -height }, end: { top: 0 } }
    default:
      return { start: {}, end: {} }
  }
}
