# React Native Easy Router

## Installation

```
npm install --save react-native-router-flux
```

## Usage

```javascript
import React from 'react'
import Router from 'react-native-easy-router'
import { Text, View } from 'react-native'

const First = ({ router }) => (
  <View style={{ backgroundColor: 'white', flex: 1 }}>
    <Text>First screen</Text>
    <Text onPress={() => router.push.Second({ name: 'John' })}>Go forward</Text>
  </View>
)

const Second = ({ router, name }) => (
  <View style={{ backgroundColor: 'pink', flex: 1 }}>
    <Text>Second screen</Text>
    <Text>Hello {name}!</Text>
    <Text onPress={() => router.pop()}>Go back</Text>
  </View>
)

const routes = { First, Second }
const App = () => <Router routes={routes} initialRoute="First" />

export default App
```

You can see more usage examples in [example](https://github.com/sergeyshpadyrev/react-native-easy-router/tree/master/example) directory

## API

#### Router properties

| Property            | Type     | Required | Description                                          |
| ------------------- | -------- | -------- | ---------------------------------------------------- |
| routes              | object   | required | route components keyed by route name                 |
| initialRoute        | string   | required | initial route name                                   |
| router              | function |          | function to get router object                        |
| disableHardwareBack | boolean  |          | don't use Android back button to pop (default false) |

```javascript
// Example

<Router
  routes={{ first: First, second: Second }}
  initialRoute="first"
  router={router => (this.router = router)}
  disableHardwareBack={false}
/>
```

#### Router functions

Router object can be found in route component parameters or can be got from `routerRef` property

| Property | Type                                        | Description                                                       |
| -------- | ------------------------------------------- | ----------------------------------------------------------------- |
| pop      | function(animation)                         | Pops the last screen                                              |
| push     | object{key:function(parameters, animation)} | Object of functions to push new screen keyed by route name        |
| replace  | object{key:function(parameters, animation)} | Object of functions to replace current screen keyed by route name |
| reset    | object{key:function(parameters, animation)} | Object of functions to reset the whole stack keyed by route name  |
| stack    | array                                       | List of routes in stack                                           |

All functions return promises. Promise resolves when action finishes

```javascript
// Example

router.pop({type:'top'}).then(() => console.log('Popped')
router.push.first({value:123}, {type:'top'}).then(() => console.log('Pushed'))
router.replace.second({value:123}, {type:'top'}).then(() => console.log('Replaced'))
router.reset.first({value:123}, {type:'top'}).then(() => console.log('Reset'))
```

#### Router stack element

| Parameter | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| id        | integer  | Index of route in stack                |
| route     | string   | Route name                             |
| params    | object   | Parameters passed to screen            |
| pop       | function | Function to pop all screens until this |

```javascript
// Example

console.log(router.stack[0].id) // 0
console.log(router.stack[0].route) // 'first'
console.log(router.stack[0].params) // {}

router.stack[0].pop({ type: 'bottom' }).then(() => console.log('Popped to route'))
```

#### Animation

| Property | Available values                                                           |
| -------- | -------------------------------------------------------------------------- |
| type     | 'none', 'bottom','left', 'right', 'top'                                    |
| duration | integer number in milliseconds                                             |
| easing   | easing type from here (https://github.com/oblador/react-native-animatable) |

When you set animation type to `none` no animation is shown

```javascript
// Example

router.pop({ type: 'bottom', duration: 500, easing: 'ease-in-out' })
```
