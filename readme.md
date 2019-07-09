# React Native Easy Router

[![npm version](https://badge.fury.io/js/react-native-easy-router.svg)](https://badge.fury.io/js/react-native-easy-router)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React Native Easy Router is an easy-to-use and performant screen navigation library for React Native

**WARNING**: _Versions 2.x.x of this library is already not supported but you can find docs and examples [here](https://github.com/sergeyshpadyrev/react-native-easy-router/tree/v2)_

## Installation

```
npm install --save react-native-easy-router
```

## Usage

```js
import { AppRegistry, Text, View } from 'react-native'
import { name } from './app.json'
import React from 'react'
import Navigator from 'react-native-easy-router'

const First = ({ navigator }) => (
    <View
        style={{ alignItems: 'center', backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Text>First screen</Text>
        <Text onPress={() => navigator.push('Second', { name: 'John' })}>Go forward</Text>
    </View>
)

const Second = ({ navigator, name }) => (
    <View
        style={{ alignItems: 'center', backgroundColor: 'pink', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Text>Second screen</Text>
        <Text>Hello {name}!</Text>
        <Text onPress={() => navigator.pop()}>Go back</Text>
    </View>
)

const Application = () => <Navigator screens={{ First, Second }} initialStack='First' />

AppRegistry.registerComponent(name, () => Application)

```
You can look at [example](https://github.com/sergeyshpadyrev/react-native-easy-router/tree/v3/example) for better understanding

## Documentation

### Navigator properties

#### screens (_required_)
Screen components keyed by screen name

<<<<<<< HEAD
<Router
  routes={{ First, Second }}
  initialRoute="First"
  router={router => (this.router = router)}
  disableHardwareBack={false}
/>
=======
_Example_:
```js
<Navigator screens={{ Welcome: ({navigator}) => <View><Text>Welcome</Text></View> }}/>
>>>>>>> v3
```

#### initialStack (_required_)

Initial stack can be a first screen name, an array of screen names or even array of screen objects that are are returned from `navigator.stack` or `onStackUpdate`.

_Examples_:
```js
<Navigator initialStack='First'/>
```
or
```js
<Navigator initialStack={['First', 'Second']}/>
```
or
```js
<Navigator initialStack={[{screen: 'First', props: {name: 'John'}, transitionProps: {animation: 'left'}}]}/>
```

#### onStackUpdate
Callback that is called when stack updates

_Example_:
```js
<Navigator onStackUpdate={(stack, previousStack) => console.log(stack, previousStack)}/>
```

#### backHandler
_Default value_: `navigator => navigator.pop()`
Function that is called when user presses back button on Android or makes swipe back on IOS.
If you return `false` from this function on Android app will be minimized.

_Example_:
```js
<Navigator backHandler={navigator => navigator.pop()}/>
```

#### navigatorRef
Callback that is called on navigator initialization with `navigator` reference so you can manage your navigator from the outside.

_Example_:
```js
<Navigator navigatorRef={ref => (this.navigator = ref)}/>
```

#### animations
Custom animations that you can use for transitions. Because navigator uses native transitions you can use only 'transform' animations. You can use this animation with any `navigator` method.

_Example_:
```js
import { Dimensions } from 'react-native'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

<Navigator animations={{
  bottomRight: {
      start: { transform: [{ translateX: windowWidth }, { translateY: windowHeight }] },
      end: { transform: [{ translateX: 0 }, { translateY: 0 }] }
  }
}}/>
```

### Navigator methods
Navigator passes `navigator` object to every screen. With this object you can manage your screens. Also you can get this object with `navigatorRef`.

#### push(screen, props, transitionProps)
Pushes new screen to the stack. Returns `Promise` that is resolved after transition finishes.

_Example_:
```js
  // Stack before: First
  navigator.push('Second', {email: 'john@gmail.com'}, {animation: 'bottom'})
  // Stack after: First, Second
```

#### pop(transitionProps)
Pops last screen from the stack. If `transitionProps` are not provided uses those transitionProps that this screen was pushed with. Returns `Promise` that is resolved after transition finishes.

_Example_:
```js
  // Stack before: First, Second
  navigator.pop({animation: 'left'})
  // Stack after: First
```

#### reset(screen, props, transitionProps)
Resets the whole stack to a new screen. Returns `Promise` that is resolved after transition finishes.

_Example_:
```js
  // Stack before: First, Second
  navigator.reset('Third', {name: 'John'}, {animation: 'fade'})
  // Stack after: Third
```

#### stack
Returns the stack

_Example_:
```js
  // Stack before: First, Second
  console.log(navigator.stack) // [{id: 'some-id', screen: 'First', props: {name: 'John'}, transitionProps: {animation: 'left', duration: 500, easing: 'ease-in-out'}}]
```

#### popTo(screenId, transitionProps)
Pops all screens after the certain screen. If `transitionProps` are not provided uses those transitionProps that this screen was pushed with. Returns `Promise` that is resolved after transition finishes.

_Example_:
```js
  // Stack before: First, Second, Third, Fourth
  navigator.popTo(navigator.stack[1].id)
  // Stack after: First, Second
```

#### resetFrom(screenId, screen, props, transitionProps)
Resets the stack after the certain screen. Returns `Promise` that is resolved after transition finishes.

<<<<<<< HEAD
| Index | Type    | Description                                                      |
| ----- | ------- | ---------------------------------------------------------------- |
| 0     | Object  | Start position for in animation / end position for out animation |
| 1     | Object  | Start position for out animation / end position for in animation |
| 2     | Boolean | Usage of native driver animation                                 |
| 3     | Object  | (optional) End position for out animation of previous screen     |
| 4     | Object  | (optional) End position for in animation of previous screen      |
=======
_Example_:
```js
  // Stack before: First, Second, Third, Fourth
  navigator.resetFrom(navigator.stack[1].id, 'Fifth', {age: 18})
  // Stack after: First, Second, Fifth
```
>>>>>>> v3

#### register/unregisterBackHandler

If you want to handle Android hardware back press and IOS swipe back on the certain screen you can use this methods. If you return `false` from callback function on Android app will be minimized.

_Example_:
```js
  componentDidMount = () => {
      this.props.navigator.registerBackHandler(this.onBack)
  }

  componentWillUnmount = () => {
      this.props.navigator.unregisterBackHandler()
  }

  onBack = navigator => navigator.pop()
```

### Transition props

#### animation
_Default value_: `'right'`

One of default animations: `right`, `left`, `top`, `bottom`, `none`, `fade`. Or one of custom animations provided to navigator by `animations` property.

#### duration
_Default value_: `250`

Duration of transition in milliseconds. Not applied to `none` animation.

#### easing
_Default value_: `'ease-in-out'`

One of easings from [this table](https://github.com/oblador/react-native-animatable#properties). Not applied to `none` animation.
