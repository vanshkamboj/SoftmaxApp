import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Mobilenumber from './Mobilenumber';
import Demo1 from './demo1';
// import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default class Demo extends Component {
    render() {
        return (
            <Tab.Navigator>
                {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
                <Tab.Screen name="Mobile" component={Mobilenumber} />
                <Tab.Screen name="demo1" component={Demo1} />
            </Tab.Navigator>
        )
    }
}