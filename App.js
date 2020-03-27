import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, View, Dimensions, Text } from 'react-native';
import LoginPage from './src/screens/LoginPage';
import SignUp from './src/screens/SignUp';
import HomeScreen from './src/screens/HomeScreen';
const Stack = createStackNavigator();
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen name="LoginPage" component={LoginPage}

          options={{
            title: 'Softmax',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              alignSelf: 'center',
              marginLeft: screenWidth / 2.5
            },
          }}

        />
        {/* <Stack.Screen name="NotesPage" component={Notes}
          options={{
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25
            },
          }}

        /> */}
        {/* <Stack.Screen name="Display" component={Display} />
        <Stack.Screen name="model" component={model} />
        <Stack.Screen name="user" component={UsersData} />
        <Stack.Screen name="details" component={UserDetails} /> */}
        <Stack.Screen name="signup" component={SignUp}
          options={{
            title: 'Softmax',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#3498db',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              alignSelf: 'center',
            },
          }} />
        <Stack.Screen name="home" component={HomeScreen}
          options={{
            title: 'Softmax',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#3498db',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              alignSelf: 'center',
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

