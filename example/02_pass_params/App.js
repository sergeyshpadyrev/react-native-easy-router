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

class Screen1 extends React.Component {
  state = {}

  render = () => (
    <Screen color="white">
      <TextInput
        onChangeText={text => this.setState({ text })}
        placeholder="Input text here"
        style={{ width: '80%', height: 40, borderBottomColor: 'gray', borderBottomWidth: 1 }}
        value={this.state.text}
      />
      <Text onPress={() => this.props.router.push.Screen2({ text: this.state.text })}>Go to screen 2</Text>
    </Screen>
  )
}

const Screen2 = ({ text, router }) => (
  <Screen color="pink">
    <Text>Text sent from screen 1: {text}</Text>
    <Text onPress={() => router.pop()}>Go back to screen 1</Text>
  </Screen>
)

export default () => <Router routes={{ Screen1, Screen2 }} initialRoute="Screen1" />
