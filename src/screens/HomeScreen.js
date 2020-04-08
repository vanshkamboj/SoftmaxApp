import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DeshBoard from './DeshBoard'
import Elearning from './E_learning'
import profile from './StudentProfile';

// const Drawer = createDrawerNavigator();

function IconWithBadge({ name, badgeCount, color, size }) {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <Image
                source={require('../images/home.png')}
                style={{
                    height: 20,
                    width: 20,
                    // position: 'absolute',
                    // right: 20
                }}
            />
            {badgeCount > 0 && (
                <View
                    style={{
                        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}

function HomeIconWithBadge(props) {
    // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
}


function HomeScreen2() {
    <DeshBoard />
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
function SettingsScreen2() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
const Tab = createBottomTabNavigator();
export default class HomeScreen extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === 'Home') {
                                return (
                                    <HomeIconWithBadge
                                        name={
                                            focused
                                                ? 'ios-information-circle'
                                                : 'ios-information-circle-outline'
                                        }
                                        size={size}
                                        color={color}
                                    />
                                );
                            } else if (route.name === 'E-Learning') {
                                return (
                                    <Image
                                        source={require('../images/e-learning.png')}
                                        style={{
                                            height: 30,
                                            width: 30,
                                            // position: 'absolute',
                                            // right: 20
                                        }}
                                    />
                                );
                            } else if (route.name === 'Profile') {
                                return (
                                    <Image
                                        source={require('../images/user.png')}
                                        style={{
                                            height: 30,
                                            width: 30,
                                            // position: 'absolute',
                                            // right: 20
                                        }}
                                    />
                                );
                            }
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#e0ae16',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Home" component={DeshBoard} />
                    <Tab.Screen name="E-Learning" component={Elearning} />
                    <Tab.Screen name="Profile" component={profile} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}