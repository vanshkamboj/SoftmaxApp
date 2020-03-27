import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import App from '../../App'
import Mobilenumber from './Mobilenumber';
import Demo from './demo';

const Drawer = createDrawerNavigator();

export default class HomeScreen extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Demo">
                    {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
                    <Drawer.Screen name="app" component={App} />
                    <Drawer.Screen name="Logout" component={Mobilenumber} />
                    <Drawer.Screen name="Demo" component={Demo} />

                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}