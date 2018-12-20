import { AppRegistry } from 'react-native'
import { Dimensions } from 'react-native'
import { name as applicationName } from './app.json'
import React from 'react'
import Router from 'react-native-easy-router'
import { Text, View } from 'react-native'

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

const { width, height } = Dimensions.get('window')
const animations = {
  'skew-fade': [{ transform: [{ skewX: '90deg' }], opacity: 0 }, { transform: [{ skewX: '0deg' }], opacity: 1 }, false]
}

const Screen1 = ({ router }) => (
  <Screen color="white">
    <Text onPress={() => router.push.Screen2({}, { type: 'skew-fade' })}>
      Go to screen 2 {/* Stack will be [Screen1, Screen2] */}
    </Text>
  </Screen>
)

const Screen2 = ({ router }) => (
  <Screen color="pink">
    <Text onPress={() => router.pop()}>Go back to screen 1 {/* Stack will be [Screen1] */}</Text>
  </Screen>
)

const Application = () => <Router animations={animations} routes={{ Screen1, Screen2 }} initialRoute="Screen1" />
AppRegistry.registerComponent(applicationName, () => Application)
