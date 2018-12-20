import { AppRegistry } from 'react-native'
import { name as applicationName } from './app.json'
import React from 'react'
import Router from 'react-native-easy-router'
import { Text, TextInput, View } from 'react-native'

const Screen = ({ children, color }) => (
  <View
    style={{
      alignItems: 'center',
      backgroundColor: color,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around'
    }}
  >
    {children}
  </View>
)

const Screen1 = ({ router }) => (
  <Screen color="white">
    <Text onPress={() => router.push.Screen2()}>Go to screen 2 {/* Stack will be [Screen1, Screen2] */}</Text>
  </Screen>
)

const Screen2 = ({ router }) => (
  <Screen color="pink">
    <Text onPress={() => router.pop()}>Go back to screen 1 {/* Stack will be [Screen1] */}</Text>
    <Text onPress={() => router.replace.Screen3()}>Replace with screen 3 {/* Stack will be [Screen1, Screen3] */}</Text>
  </Screen>
)

const Screen3 = ({ router }) => (
  <Screen color="yellow">
    <Text onPress={() => router.pop()}>Go back to screen 1 {/* Stack will be [Screen1] */}</Text>
    <Text onPress={() => router.replace.Screen2()}>Replace with screen 2 {/* Stack will be [Screen1, Screen2] */}</Text>
  </Screen>
)

const Application = () => <Router routes={{ Screen1, Screen2, Screen3 }} initialRoute="Screen1" />
AppRegistry.registerComponent(applicationName, () => Application)
