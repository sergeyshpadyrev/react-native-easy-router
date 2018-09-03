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

const goTo = 'Go to screen 2 with'
const goBack = 'Go back to screen 1 with'

const Screen1 = ({ router }) => (
  <Screen color="white">
    <Text onPress={() => router.push.Screen2({}, { type: 'none' })}>{goTo} no animation</Text>
    <Text onPress={() => router.push.Screen2()}>{goTo} default animation</Text>
    <Text onPress={() => router.push.Screen2({}, { type: 'left' })}>{goTo} left animation</Text>
    <Text onPress={() => router.push.Screen2({}, { type: 'right' })}>{goTo} right animation</Text>
    <Text onPress={() => router.push.Screen2({}, { type: 'bottom' })}>{goTo} bottom animation</Text>
    <Text onPress={() => router.push.Screen2({}, { type: 'top' })}>{goTo} top animation</Text>
  </Screen>
)

const Screen2 = ({ router }) => (
  <Screen color="pink">
    <Text onPress={() => router.pop({ type: 'none' })}>{goBack} no animation</Text>
    <Text onPress={() => router.pop()}>{goBack} default animation</Text>
    <Text onPress={() => router.pop({ type: 'left' })}>{goBack} left animation</Text>
    <Text onPress={() => router.pop({ type: 'right' })}>{goBack} right animation</Text>
    <Text onPress={() => router.pop({ type: 'bottom' })}>{goBack} bottom animation</Text>
    <Text onPress={() => router.pop({ type: 'top' })}>{goBack} top animation</Text>
  </Screen>
)

const Application = () => <Router routes={{ Screen1, Screen2 }} initialRoute="Screen1" />
AppRegistry.registerComponent(applicationName, () => Application)
