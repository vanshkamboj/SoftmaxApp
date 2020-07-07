import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'

export default class Demo extends Component {
    state = {
        text: ""
    }
    render() {
        return (
            <View>
                <TextInput
                    style={{
                        width: 300,
                        height: 50,
                        borderWidth: 1,
                        marginTop: 20
                    }}
                    onChangeText={(value) => this.setState({ text: value })}
                />
                <Text style={{ fontSize: 30 }}>{this.state.text}</Text>
            </View>
        )
    }
}
