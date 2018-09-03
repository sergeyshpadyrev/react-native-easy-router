import { AppRegistry } from 'react-native'
import { name as applicationName } from './app.json'
import React from 'react'
import Router from 'react-native-easy-router'
import { Text, TextInput, View } from 'react-native'

const Screen = ({ router, color, next, type, text }) => (
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
    <Text onPress={() => router[type || 'push'][`Screen${next}`]()}>
      {text || 'Go to'} screen {next}
    </Text>
  </View>
)

const Screen1 = ({ router }) => <Screen router={router} color="pink" next="2" />
const Screen2 = ({ router }) => <Screen router={router} color="yellow" next="3" />
const Screen3 = ({ router }) => <Screen router={router} color="orange" next="1" type="reset" text="Reset to" />

const stackText = stack => JSON.stringify(stack.map(route => parseInt(route.route.substring(6), 10)))

class Application extends React.Component {
  state = {
    event: '(none)',
    stackText: '',
  }

  onBeforeStackChange = (animation, oldStack, newStack) => {
    this.setState({
      event: 'onBeforeStackChange',
      stackText: `${stackText(oldStack)} -> ${stackText(newStack)}`,
    })
  }

  onStackChange = stack => {
    this.setState({
      event: 'onStackChange',
      stackText: stackText(stack),
    })
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 80,
          padding: 10,
          justifyContent: 'flex-end',
        }}>
        <Text>
          {this.state.event}
          {'\n'}
          {this.state.stackText}
        </Text>
      </View>
      <Router
        routes={{ Screen1, Screen2, Screen3 }}
        initialRoute="Screen1"
        router={router => this.router = router}
        onBeforeStackChange={this.onBeforeStackChange}
        onStackChange={this.onStackChange}
      />
    </View>
  )
}
AppRegistry.registerComponent(applicationName, () => Application)
