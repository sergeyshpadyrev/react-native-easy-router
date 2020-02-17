import { Dimensions } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
const defaultAnimations = {
    bottom: {
        start: { transform: [{ translateY: windowHeight }] },
        end: { transform: [{ translateY: 0 }] }
    },
    fade: {
        start: { transform: [{ opacity: 0 }] },
        end: { transform: [{ opacity: 1 }] }
    },
    left: {
        start: { transform: [{ translateX: -windowWidth }] },
        end: { transform: [{ translateX: 0 }] }
    },
    right: {
        start: { transform: [{ translateX: windowWidth }] },
        end: { transform: [{ translateX: 0 }] }
    },
    top: {
        start: { transform: [{ translateY: -windowHeight }] },
        end: { transform: [{ translateY: 0 }] }
    }
}

export default customAnimations => {
    const animations = { ...defaultAnimations, ...customAnimations }
    return (screen, transitionProps, reverse) => {
        if (transitionProps.animation === 'none') return Promise.resolve()

        const animation = animations[transitionProps.animation]
        const from = animation[reverse ? 'end' : 'start']
        const to = animation[reverse ? 'start' : 'end']
        const duration = transitionProps.duration
        const easing = transitionProps.easing

        return new Promise(resolve => {
            screen.transition(from, to, duration, easing)
            setTimeout(resolve, duration)
        })
    }
}
