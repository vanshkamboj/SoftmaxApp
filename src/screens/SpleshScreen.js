import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Actions } from 'react-native-router-flux'
import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
} from 'react-native-navigation-bar-color'

export default class Splesh extends Component {
    // getData = async () => {

    //     try {
    //         const value = await AsyncStorage.getItem('islogin')
    //         if (value !== null) {
    //             if (value == "true")
    //                 Actions.Home()
    //             else
    //                 Actions.login()
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // }
    componentDidMount() {
        changeNavigationBarColor('#2a017d')
        setTimeout(async () => {

            // getData = async () => {

            try {
                const value = await AsyncStorage.getItem('islogin')
                if (value !== null) {
                    if (value == "true")
                        Actions.Home()
                }
                else
                    Actions.login()
            } catch (e) {
                alert(e)
            }
            // }
            // this.getData()
        }, 3000);
    }

    render() {
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