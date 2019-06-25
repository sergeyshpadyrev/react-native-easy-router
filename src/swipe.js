import { PanResponder, Platform, View } from 'react-native'
import React from 'react'

const velocityThreshold = 2
const directionalOffsetThreshold = 80

const AndroidPlaceholder = ({ children }) => <View style={{ flex: 1 }}>{children}</View>

class IOSSwipeRecognizer extends React.Component {
    isSwipeBack = gesture =>
        Math.abs(gesture.vx) > velocityThreshold &&
        Math.abs(gesture.dy) < directionalOffsetThreshold &&
        gesture.dx > 0

    check = (event, gesture) => {
        const isSingleTouch = event.nativeEvent.touches.length === 1
        const isClick = Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5

        return isSingleTouch && !isClick && this.isSwipeBack(gesture)
    }

    finish = (event, gesture) => {
        const { onSwipeBack } = this.props
        if (this.isSwipeBack(gesture)) onSwipeBack()
    }

    panResponser = PanResponder.create({
        onStartShouldSetPanResponder: this.check,
        onMoveShouldSetPanResponder: this.check,
        onPanResponderRelease: this.finish,
        onPanResponderTerminate: this.finish
    })

    render = () => {
        const { children } = this.props
        return (
            <View style={{ flex: 1 }} {...this.panResponser.panHandlers}>
                {children}
            </View>
        )
    }
}

export default Platform.select({
    android: AndroidPlaceholder,
    ios: IOSSwipeRecognizer
})
