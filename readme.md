# React Native Easy Router

## Installation

```
npm install --save react-native-easy-router
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

You can see more usage examples in [examples](https://github.com/sergeyshpadyrev/react-native-easy-router/tree/master/example)

## API

#### Router properties

| Property            | Type     | Required | Description                                          |
| ------------------- | -------- | -------- | ---------------------------------------------------- |
| animations          | object   |          | custom animations                                    |
| routes              | object   | required | route components keyed by route name                 |
| initialRoute        | string   | required | initial route name                                   |
| router              | function |          | function to get router object                        |
| disableHardwareBack | boolean  |          | disable Android back button and iOS swipe back (default false) |
| onStackChange       | function |          | function called after navigation stack changes       |
| onBeforeStackChange | function |          | function called before navigation stack changes      |

```javascript
// Example

<Router
  routes={{ First, Second }}
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
router.push.First({value:123}, {type:'top'}).then(() => console.log('Pushed'))
router.replace.Second({value:123}, {type:'top'}).then(() => console.log('Replaced'))
router.reset.First({value:123}, {type:'top'}).then(() => console.log('Reset'))
```

#### Router stack element

| Parameter | Type     | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| id        | string   | Id of route                                         |
| route     | string   | Route name                                          |
| params    | object   | Parameters passed to screen                         |
| animation | object   | Animation used to transition to this screen         |
| pop       | function | Function to pop all screens until this              |
| replace   | function | Function to replace all screens in stack after this |

```javascript
// Example

console.log(router.stack[0].id)
console.log(router.stack[0].route)
console.log(router.stack[0].params)

router.stack[0].pop({ type: 'bottom' }).then(() => console.log('Popped to route'))
router.stack[0].replace.Second().then(() => console.log('Replaced'))
```

#### Screen elements

Each Screen element will have it's 'id' property set to match the Id of the route. This allows
a given instance of a screen to check if it is the current top level screen on the stack.

Example code:
```
isActive = () => {
  const { router, id } = this.props;
  const topScreen = router.stack[router.stack.length - 1];

  return (topScreen.id === id);
};
```

#### Animations

| Property | Available values                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------- |
| type     | 'none', 'bottom','left', 'left-bottom', 'left-top' 'right', 'right-bottom', 'right-top' 'top', 'fade' |
| duration | integer number in milliseconds                                                                        |
| easing   | easing type from here (https://github.com/oblador/react-native-animatable)                            |

When you set animation type to `none` no animation is shown

```javascript
// Example

router.pop({ type: 'bottom', duration: 500, easing: 'ease-in-out' })
```

#### Custom animations

Also you can pass your custom animation types to router. Where type is array consisting of:

| Index | Type    | Description                                                      |
| ----- | ------- | ---------------------------------------------------------------- |
| 0     | Object  | Start position for in animation / end position for out animation |
| 1     | Object  | Start position for out animation / end position for in animation |
| 2     | Boolean | Usage of native driver animation                                 |

```javascript
// Example

const animations = { 'skew' : [{ transform: [{ skewX: '90deg' }] }, { transform: [{ skewX: '0deg' }] }, false] }
<Router animations={animations} routes={First, Second} initialRoute="First"/>

// then
router.push.Second({}, { type: 'skew' })
```

The only limitation for custom animations is that the out animation `useNativeDriver` property can't be different from the in animation `useNativeDriver` property

```javascript
// You can't push screen with animation like this
[{ transform: [{ skewX: '90deg' }] }, { transform: [{ skewX: '0deg' }]}, false]
// and then pop with animation like that
[{ opacity: 1}] }, { opacity:0}, true]
```

#### Responding to stack changes

The `onStackChange` event can be used to update your application state or UI when navigation occurs. It receives a single argument, the new stack

```javascript
// Example

<Router
  onStackChange={newStack => {
    // Dispatch the new navigation stack to a store
    dispatch({type: 'SET_ROUTER_STACK', payload: newStack})
  }}
/>
```

The `onBeforeStackChange` event can be used to synchronise your application UI with router transitions. It receives 3 arguments: the transition animation, the current stack and the target stack

```javascript
// Example

<Router
  onBeforeStackChange={(animation, oldStack, newStack) => {
    // Assign the transition animation and screens to state
    const fromScreen = fromStack[fromStack.length - 1].route
    const toScreen = toStack[toStack.length - 1].route
    this.setState({animation, fromScreen, toScreen})
  }}
/>
```
