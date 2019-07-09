import { AppRegistry } from 'react-native'
import { name } from './app.json'
import Navigator from 'react-native-easy-router'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const ScreenContainer = ({ children, color, title }) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View
            style={{
                alignItems: 'center',
                backgroundColor: 'lightblue',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 50
            }}>
            <Text>{title}</Text>
        </View>
        <View
            style={{
                alignItems: 'center',
                backgroundColor: color,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
            {children}
        </View>
    </SafeAreaView>
)

const Screen1 = ({ navigator }) => (
    <ScreenContainer color='lightgreen' title='Screen1'>
        <Text onPress={() => navigator.push('Screen2', { name: 'John' })}>Push Screen2</Text>
    </ScreenContainer>
)

const Screen2 = ({ name, navigator }) => (
    <ScreenContainer color='pink' title='Screen2'>
        <Text>Hello {name}</Text>
        <Text onPress={() => navigator.pop()}>Pop</Text>
    </ScreenContainer>
)

const Application = () => <Navigator initialStack='Screen1' screens={{ Screen1, Screen2 }} />

AppRegistry.registerComponent(name, () => Application)
