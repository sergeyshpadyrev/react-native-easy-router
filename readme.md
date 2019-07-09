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

```
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
