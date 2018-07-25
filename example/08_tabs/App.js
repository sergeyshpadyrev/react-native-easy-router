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

const Screen1 = ({ router }) => <Screen color="pink" />
const Screen2 = ({ router }) => <Screen color="yellow" />
const Screen3 = ({ router }) => <Screen color="orange" />

const tabs = ['Screen1', 'Screen2', 'Screen3']

export default class TabsExample extends React.Component {
  state = { tab: 'Screen1' }

  openTab = async tab => {
    if (this.state.tab === tab) return

    const animationType = tabs.indexOf(tab) > tabs.indexOf(this.state.tab) ? 'right' : 'left'
    this.setState({ tab }, () => this.router.reset[tab]({}, { type: animationType }))
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 70,
          justifyContent: 'flex-end'
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          {tabs.map(tab => (
            <Text
              key={tab}
              onPress={() => this.openTab(tab)}
              style={{ fontWeight: this.state.tab === tab ? 'bold' : 'normal' }}
            >
              {tab}
            </Text>
          ))}
        </View>
      </View>
      <Router routes={{ Screen1, Screen2, Screen3 }} initialRoute="Screen1" routerRef={ref => (this.router = ref)} />
    </View>
  )
}
