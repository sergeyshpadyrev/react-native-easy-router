import { BackHandler } from 'react-native'
import { createInitialStack, createScreen, screenStyle } from './screen'
import createRunTransition from './transition'
import React from 'react'
import SwipeRecognizer from './swipe'
import { View } from 'react-native-animatable-promise'

class NavigatorScreen extends React.Component {
    shouldComponentUpdate = () => {
        return false
    }

    render = () => {
        const { navigator, passedProps, screen: Screen } = this.props
        return <Screen navigator={navigator} {...passedProps} />
    }
}

class Navigator extends React.Component {
    state = { stack: createInitialStack(this.props.initialStack, this.props.screens) }
    renderedScreens = {}
    runTransition = createRunTransition(this.props.animations)
    inTransition = false
    backHandlers = {}

    updateStack = stack => {
        const { stack: previousStack } = this.state
        return new Promise(resolve =>
            this.setState({ stack }, () => {
                const { onStackUpdate } = this.props
                if (onStackUpdate) onStackUpdate(stack, previousStack)
                resolve()
            })
        )
    }

    navigatorAction = action =>
        new Promise((resolve, reject) => {
            if (this.inTransition) {
                const inTransitionError =
                    "Can't process action when navigator is in transition state"
                return reject(inTransitionError)
            }

            this.inTransition = true
            action(
                () => {
                    this.inTransition = false
                    resolve()
                },
                error => {
                    this.inTransition = false
                    reject(error)
                }
            )
        })
    navigator = {
        pop: transitionProps => {
            if (this.state.stack.length === 1) throw new Error("Can't pop the only screen")

            return this.navigatorAction(async onFinish => {
                const screen = this.state.stack[this.state.stack.length - 1]
                await this.runTransition(
                    this.renderedScreens[screen.id],
                    !!transitionProps
                        ? { ...screen.transitionProps, ...transitionProps }
                        : screen.transitionProps,
                    true
                )
                await this.updateStack(this.state.stack.slice(0, -1))
                onFinish()
            })
        },
        popTo: (screenId, transitionProps) => {
            const screenIndex = this.state.stack.findIndex(({ id }) => id === screenId)
            if (screenIndex < 0) throw new Error(`No screen with id "${screenId}" found`)
            if (screenIndex === this.state.stack.length - 1)
                throw new Error(`Can't pop to current screen`)

            return this.navigatorAction(async (onFinish, onFail) => {
                if (this.state.stack.length === 1)
                    return onFail("Can't pop if there's only one screen in the stack")

                const screen = this.state.stack[this.state.stack.length - 1]
                await this.runTransition(
                    this.renderedScreens[screen.id],
                    !!transitionProps
                        ? { ...screen.transitionProps, ...transitionProps }
                        : screen.transitionProps,
                    true
                )
                await this.updateStack(this.state.stack.slice(0, screenIndex + 1))
                onFinish()
            })
        },
        push: (screenName, props, transitionProps) => {
            if (!this.props.screens.hasOwnProperty(screenName))
                throw new Error(`Screen ${screenName} doesn't exist`)

            return this.navigatorAction(async onFinish => {
                const screen = createScreen({ screen: screenName, props, transitionProps })
                await this.updateStack([...this.state.stack, screen])
                await this.runTransition(
                    this.renderedScreens[screen.id],
                    screen.transitionProps,
                    false
                )
                onFinish()
            })
        },
        reset: (screenName, props, transitionProps) => {
            if (!this.props.screens.hasOwnProperty(screenName))
                throw new Error(`Screen ${screenName} doesn't exist`)

            return this.navigatorAction(async onFinish => {
                const screen = createScreen({ screen: screenName, props, transitionProps })
                await this.updateStack([...this.state.stack, screen])
                await this.runTransition(
                    this.renderedScreens[screen.id],
                    screen.transitionProps,
                    false
                )
                await this.updateStack([screen])
                onFinish()
            })
        },
        resetFrom: (screenId, screenName, props, transitionProps) => {
            if (!this.props.screens.hasOwnProperty(screenName))
                throw new Error(`Screen ${screenName} doesn't exist`)
            const screenIndex = this.state.stack.findIndex(({ id }) => id === screenId)
            if (screenIndex < 0) throw new Error(`No screen with id "${screenId}" found`)

            return this.navigatorAction(async onFinish => {
                const screen = createScreen({ screen: screenName, props, transitionProps })
                await this.updateStack([...this.state.stack, screen])
                await this.runTransition(
                    this.renderedScreens[screen.id],
                    screen.transitionProps,
                    false
                )

                await this.updateStack([...this.state.stack.slice(0, screenIndex + 1), screen])
                onFinish()
            })
        }
    }

    onBackPress = () => {
        const { stack } = this.state
        const lastStackItemId = stack[stack.length - 1].id
        if (this.backHandlers.hasOwnProperty(lastStackItemId)) {
            this.backHandlers[lastStackItemId](this.navigator)
            return true
        }

        const { backHandler } = this.props
        if (backHandler) backHandler(this.navigator)
        return true
    }

    componentWillMount = () => {
        this.androidBackHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress
        )

        const { navigatorRef } = this.props
        if (!!navigatorRef) navigatorRef(this.navigator)
    }

    componentWillUnmount = () => {
        this.androidBackHandler.remove()

        const { navigatorRef } = this.props
        if (!!navigatorRef) navigatorRef(undefined)
    }

    renderScreen = (stackItem, index) => {
        const { screens } = this.props
        const { stack } = this.state
        const Screen = screens[stackItem.screen]
        const screenDependentMethods = {
            registerBackHandler: handler => (this.backHandlers[stackItem.id] = handler),
            unregisterBackHandler: () => delete this.backHandlers[stackItem.id]
        }
        const screenNavigator = { ...this.navigator, ...screenDependentMethods }
        Object.defineProperty(screenNavigator, 'stack', { get: () => this.state.stack })

        return (
            <View
                key={stackItem.id}
                pointerEvents={index < stack.length - 1 ? 'none' : undefined}
                style={screenStyle}
                ref={ref => (this.renderedScreens[stackItem.id] = ref)}
                useNativeDriver={true}>
                <NavigatorScreen
                    navigator={screenNavigator}
                    passedProps={stackItem.props}
                    screen={Screen}
                />
            </View>
        )
    }

    render = () => (
        <SwipeRecognizer onSwipeBack={this.onBackPress}>
            {this.state.stack.map(this.renderScreen)}
        </SwipeRecognizer>
    )
}

Navigator.defaultProps = {
    backHandler: navigator => navigator.pop()
}

export default Navigator
