import React from 'react'
import { SafeAreaView, Text } from 'react-native'

import Router from './src'

const Button = ({ color, onPress, title }) => (
  <Text onPress={onPress} style={{ backgroundColor: color, fontSize: 25 }}>
    {title}
  </Text>
)
const Screen = ({ children, color }) => (
  <SafeAreaView
    style={{ alignItems: 'center', backgroundColor: color, display: 'flex', flex: 1, justifyContent: 'space-around' }}
  >
    {children}
  </SafeAreaView>
)

const First = ({ router }) => (
  <Screen color="red">
    <Button
      color="green"
      onPress={() => router.push.second({ sentValue: 'Ololo' }).then(() => console.log('Push End'))}
      title="Go to Second"
    />
    <Button
      color="blue"
      onPress={() => {
        router.push.second({ sentValue: 'Ololo' })
        router.push.third({}, { type: 'bottom' })
      }}
      title="Double push to Third"
    />
    <Button
      color="yellow"
      onPress={() => router.replace.fourth({}, { type: 'top' }).then(() => console.log('Replace End'))}
      title="Replace with Fourth"
    />
  </Screen>
)

const Second = ({ router, sentValue }) => (
  <Screen color="green">
    <Text>{sentValue}</Text>
    <Button color="red" onPress={() => router.pop().then(() => console.log('Pop End'))} title="Back to First" />
    <Button color="orange" onPress={() => router.replace.fifth()} title="Replace with Fifth" />
    <Button color="blue" onPress={() => router.push.third({}, { type: 'bottom' })} title="Go to Third" />
  </Screen>
)

const Third = ({ router }) => (
  <Screen color="blue">
    <Button color="green" onPress={() => router.pop({ type: 'bottom' })} title="Back To Second" />
    <Button
      color="red"
      onPress={() => {
        router.pop({ type: 'bottom' })
        router.pop({ type: 'right' })
      }}
      title="Double Back To First"
    />
    <Button
      color="red"
      onPress={() => router.stack[0].pop().then(() => console.log('PopTo End'))}
      title="Pop to First"
    />
  </Screen>
)

const Fourth = ({ router }) => (
  <Screen color="yellow">
    <Button color="red" onPress={() => router.replace.first({}, { type: 'bottom' })} title="Replace with First" />
  </Screen>
)

const Fifth = ({ router }) => (
  <Screen color="orange">
    <Button
      color="green"
      onPress={() => router.replace.second({ sentValue: 'Trololo' }, { type: 'left' })}
      title="Replace with Second"
    />
  </Screen>
)

const routes = { first: First, second: Second, third: Third, fourth: Fourth, fifth: Fifth }
const App = () => <Router routes={routes} initialRoute="first" />

export default App
