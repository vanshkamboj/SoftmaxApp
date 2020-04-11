import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import homeWork from './ShowHomeWork'
import Dairy from './DairyPics'
// import profile from './StudentProfile';

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
    return <IconWithBadge {...props} badgeCount={0} />;
}

const Tab = createBottomTabNavigator();
export default class HomeWork extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === 'HomeWork') {
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
                            } else if (route.name === 'Dairy Pic') {
                                return (
                                    <Image
                                        source={require('../images/book.png')}
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
                    <Tab.Screen name="HomeWork" component={homeWork} />
                    <Tab.Screen name="Dairy Pic" component={Dairy} />
                    {/* <Tab.Screen name="Profile" component={profile} /> */}
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}