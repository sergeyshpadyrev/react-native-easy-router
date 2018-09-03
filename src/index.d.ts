import * as React from "react";
import {ViewStyle} from "react-native";

declare module "react-native-easy-router" {

    type EasingFunction = {(t: number): number};
    type Easing =
        | "linear"
        | "ease"
        | "ease-in"
        | "ease-out"
        | "ease-in-out"
        | "ease-in-cubic"
        | "ease-out-cubic"
        | "ease-in-out-cubic"
        | "ease-in-circ"
        | "ease-out-circ"
        | "ease-in-out-circ"
        | "ease-in-expo"
        | "ease-out-expo"
        | "ease-in-out-expo"
        | "ease-in-quad"
        | "ease-out-quad"
        | "ease-in-out-quad"
        | "ease-in-quart"
        | "ease-out-quart"
        | "ease-in-out-quart"
        | "ease-in-quint"
        | "ease-out-quint"
        | "ease-in-out-quint"
        | "ease-in-sine"
        | "ease-out-sine"
        | "ease-in-out-sine"
        | "ease-in-back"
        | "ease-out-back"
        | "ease-in-out-back"
        | EasingFunction;

    export interface Params {
        [key: string]: any;
    }

    export interface Animation {
        type: string;
        duration?: number;
        easing?: Easing;
    }

    export type AnimationPosition = ViewStyle;

    export type CustomAnimation = [AnimationPosition, AnimationPosition, boolean];

    export interface CustomAnimations {
        [animation: string]: CustomAnimation;
    }

    export interface Route {
        id: string;
        route: string;
        params: any;
        animation?: Animation
        pop: (animation?: Animation) => void;
        replace: (animation?: Animation) => void;
    }

    export type RouterStack = Array<Route>;

    export interface Router {
        pop: (animation?: Animation) => void;
        push: {
            [route: string]: (params: Params, animation: Animation) => void;
        };
        replace: {
            [route: string]: (params: Params, animation: Animation) => void;
        };
        reset: {
            [route: string]: (params: Params, animation: Animation) => void;
        };
        stack: RouterStack;
    }

    export interface RouterProps {
        animations?: CustomAnimations;
        routes: {
            [key: string]: React.ComponentClass<any> | React.SFC<any>;
        };
        initialRoute: string;
        router?: (router: Router) => void;
        disableHardwareBack?: boolean;
        onStackChange?: (stack: RouterStack) => void;
        onBeforeStackChange?: (animation: Animation, fromStack: RouterStack, toStack: RouterStack) => void;
    }

    export default class ReactNativeEasyRouter extends React.Component<RouterProps> {}
}
