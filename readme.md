# React Native Easy Router

## Installation

```
npm install --save react-native-router-flux
```

## Usage

## API

#### Router properties

| Property     | Type     | Required | Description                          |
| ------------ | -------- | -------- | ------------------------------------ |
| routes       | object   | required | route components keyed by route name |
| initialRoute | string   | required | initial route name                   |
| routerRef    | function |          | function to get router object        |

```javascript
// Example

<Router routes={{ first: First, second: Second }} initialRoute="first" routerRef={ref => (this.router = ref)} />
```

#### Router functions

Router object can be found in route component parameters or can be got from `routerRef` property

| Property | Type                                        | Description                                                       |
| -------- | ------------------------------------------- | ----------------------------------------------------------------- |
| pop      | function(animation)                         | Pops the last screen                                              |
| push     | object{key:function(parameters, animation)} | Object of functions to push new screen keyed by route name        |
| replace  | object{key:function(parameters, animation)} | Object of functions to replace current screen keyed by route name |
| stack    | array                                       | List of routes in stack                                           |

All functions return promises. Promise resolves when action finishes

```javascript
// Example

router.pop({type:'top'}).then(() => console.log('Popped')
router.push.first({value:123}, {type:'top'}).then(() => console.log('Pushed'))
router.replace.second({value:123}, {type:'top'}).then(() => console.log('Replaced'))
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
| type     | 'bottom','left', 'right', 'top', null                                      |
| duration | integer number in milliseconds                                             |
| easing   | easing type from here (https://github.com/oblador/react-native-animatable) |

When you set animation type to `null` no animation is shown

```javascript
// Example

router.pop({ type: 'bottom', duration: 500, easing: 'ease-in-out' })
```
