import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

import Router from './src'

const Screen = ({ children, color }) => (
  <View
    style={{ alignItems: 'center', backgroundColor: color, display: 'flex', flex: 1, justifyContent: 'space-around' }}
  >
    {children}
  </View>
)

const First = ({ router }) => (
  <Screen color="red">
    <Text>Screen 1</Text>
  </Screen>
)

const Second = ({ router, sentValue }) => (
  <Screen color="pink">
    <Text>Screen 2</Text>
  </Screen>
)

const Third = ({ router }) => (
  <Screen color="yellow">
    <Text>Screen 3</Text>
  </Screen>
)

const routes = { first: First, second: Second, third: Third }

const Tabs = ({ active, changeTab, children, tabs }) => {
  const Tab = ({ name }) => (
    <Text
      onPress={() => {
        if (!!active) changeTab(name)
      }}
      style={{ fontSize: active === name ? 20 : 12 }}
    >
      {name}
    </Text>
  )
  return (
    <View style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
      <View style={{ flex: 1 }}>{children}</View>
      <View
        style={{
          backgroundColor: 'green',
          width: '100%',
          height: 80,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {tabs.map(tab => <Tab key={tab} name={tab} />)}
      </View>
    </View>
  )
}

const tabs = ['first', 'second', 'third']
class App extends React.Component {
  state = { active: 'first' }

  changeTab = tab => {
    if (tab === this.state.active) return
    const animationType = tabs.indexOf(tab) > tabs.indexOf(this.state.active) ? 'right' : 'left'
    this.setState({ active: null }, () =>
      this.router.replace[tab]({}, { type: animationType }).then(() => this.setState({ active: tab }))
    )
  }

  render = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs active={this.state.active} changeTab={this.changeTab} tabs={tabs}>
        <Router
          routes={routes}
          initialRoute="first"
          routerRef={ref => (this.router = ref)}
          disableHardwareBack={true}
        />
      </Tabs>
    </SafeAreaView>
  )
}

export default App
