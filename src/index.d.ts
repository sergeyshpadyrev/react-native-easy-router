import * as React from 'react'
import { ViewStyle } from 'react-native'

declare module 'react-native-easy-router' {
    type EasyRouterEasingFunction = { (t: number): number }
    type EasyRouterEasing =
        | 'linear'
        | 'ease'
        | 'ease-in'
        | 'ease-out'
        | 'ease-in-out'
        | 'ease-in-cubic'
        | 'ease-out-cubic'
        | 'ease-in-out-cubic'
        | 'ease-in-circ'
        | 'ease-out-circ'
        | 'ease-in-out-circ'
        | 'ease-in-expo'
        | 'ease-out-expo'
        | 'ease-in-out-expo'
        | 'ease-in-quad'
        | 'ease-out-quad'
        | 'ease-in-out-quad'
        | 'ease-in-quart'
        | 'ease-out-quart'
        | 'ease-in-out-quart'
        | 'ease-in-quint'
        | 'ease-out-quint'
        | 'ease-in-out-quint'
        | 'ease-in-sine'
        | 'ease-out-sine'
        | 'ease-in-out-sine'
        | 'ease-in-back'
        | 'ease-out-back'
        | 'ease-in-out-back'
        | EasyRouterEasingFunction

    export interface EasyRouterPassingProps {
        [key: string]: any
    }

    export type EasyRouterCustomAnimation = {
        start: ViewStyle
        end: ViewStyle
    }

    export interface EasyRouterTransitionProps {
        animation: string
        duration: number
        easing: EasyRouterEasing
    }

    export interface EasyRouterTransitionOptionalProps {
        animation: string
        duration?: number
        easing?: EasyRouterEasing
    }

    export interface EasyRouterScreen {
        id: string
        screen: string
        props: EasyRouterPassingProps
        transitionProps: EasyRouterTransitionProps
    }

    export interface EasyRouterOptionalScreen {
        id?: string
        screen: string
        props?: EasyRouterPassingProps
        transitionProps?: EasyRouterTransitionOptionalProps
    }

    export interface EasyRouterNavigator {
        pop: (transitionProps?: EasyRouterTransitionOptionalProps) => Promise<void>
        popTo: (
            screenId: string,
            transitionProps?: EasyRouterTransitionOptionalProps
        ) => Promise<void>
        push: (
            screen: string,
            props?: EasyRouterPassingProps,
            transitionProps?: EasyRouterTransitionOptionalProps
        ) => Promise<void>
        replace: (
            screen: string,
            props?: EasyRouterPassingProps,
            transitionProps?: EasyRouterTransitionOptionalProps
        ) => Promise<void>
        reset: (
            screen: string,
            props?: EasyRouterPassingProps,
            transitionProps?: EasyRouterTransitionOptionalProps
        ) => Promise<void>
        resetFrom: (
            screenId: string,
            screen: string,
            props?: EasyRouterPassingProps,
            transitionProps?: EasyRouterTransitionOptionalProps
        ) => Promise<void>
        registerBackHandler: (onBack: (navigator: EasyRouterNavigator) => void) => void
        stack: EasyRouterScreen[]
        unregisterBackHandler: () => void
    }

    export interface EasyRouterProps {
        animations?: { [key: string]: EasyRouterCustomAnimation }
        backHandler?: (navigator: EasyRouterNavigator) => void
        initialStack: string | (string | EasyRouterOptionalScreen)[]
        navigatorRef?: (navigator: EasyRouterNavigator) => void
        onStackUpdate?: (stack: EasyRouterScreen[], previousStack: EasyRouterScreen[]) => void
        screens: { [key: string]: React.ComponentClass<any> | React.SFC<any> }
    }

    export default class ReactNativeEasyRouter extends React.Component<EasyRouterProps> {}
}
