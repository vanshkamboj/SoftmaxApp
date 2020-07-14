import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Actions } from 'react-native-router-flux'
import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
} from 'react-native-navigation-bar-color'

export default class Splesh extends Component {

    componentDidMount() {
        setTimeout(async () => {
            Actions.login()
        }, 3000);
    }

    render() {
        changeNavigationBarColor('#2a017d')
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#2a017d' }}>
                <Image
                    source={require('../images/logo.jpg')}
                    style={{
                        height: 200,
                        width: 200,
                        margin: 10
                    }}
                />
                {/* <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20 }}>Softmax</Text> */}
            </View>
        )
    }
}