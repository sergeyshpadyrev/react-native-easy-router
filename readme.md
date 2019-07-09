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

_Example_:
```js
<Navigator screens={{ Welcome: ({navigator}) => <View/> }}/>
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
Function that is called when user presses back button on Android or makes swipe back on IOS
If you return `false` from this function on Android app will be minimized

_Example_:
```js
<Navigator backHandler={navigator => navigator.pop()}/>
```

#### navigatorRef
Callback that is called on navigator initialization with `navigator` reference so you can manage your navigator from outside.

_Example_:
```js
<Navigator navigatorRef={ref => (this.navigator = ref)}/>
```
