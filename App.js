// import { createStackNavigator } from '@react-navigation/stack';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Image, View, Dimensions, Text, TouchableOpacity } from 'react-native';
// import LoginPage from './src/screens/LoginPage';
// import SignUp from './src/screens/SignUp';
// import HomeScreen from './src/screens/HomeScreen';
// import PushNotification from "react-native-push-notification";

// // const Stack = createStackNavigator();
// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);


// export default class App extends React.Component {
//   constructor() {
//     super()
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function (token) {
//         console.log("TOKEN:", token);
//       },

//       // (required) Called when a remote or local notification is opened or received
//       onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//       },
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true
//       },
//       popInitialNotification: true,
//       requestPermissions: true
//     });

//   }
//   getPush = () => {
//     PushNotification.localNotification({

//       /* iOS and Android properties */
//       title: "Home Work", // (optional)
//       message: "Check HomeWork from Dairy", // (required)
//       // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
//     });
//   }
//   render() {
//     return (
//       <View>
//         <Text>vansh kamboj</Text>
//         <TouchableOpacity
//           onPress={() => {
//             // alert("ok")
//             this.getPush()
//           }}
//         >
//           <Text>Click</Text>
//         </TouchableOpacity>

//       </View>
//       // <NavigationContainer>
//       //   <Stack.Navigator
//       //   >
//       //     <Stack.Screen name="LoginPage" component={LoginPage}

//       //       options={{
//       //         title: 'Softmax',
//       //         headerStyle: {
//       //           backgroundColor: '#3498db',
//       //         },
//       //         headerTintColor: '#fff',
//       //         headerTitleStyle: {
//       //           fontWeight: 'bold',
//       //           fontSize: 25,
//       //           alignSelf: 'center',
//       //           marginLeft: screenWidth / 2.5
//       //         },
//       //       }}

//       //     />
//       //     {/* <Stack.Screen name="NotesPage" component={Notes}
//       //       options={{
//       //         headerStyle: {
//       //           backgroundColor: '#3498db',
//       //         },
//       //         headerTintColor: '#fff',
//       //         headerTitleStyle: {
//       //           fontWeight: 'bold',
//       //           fontSize: 25
//       //         },
//       //       }}

//       //     /> */}
//       //     {/* <Stack.Screen name="Display" component={Display} />
//       //     <Stack.Screen name="model" component={model} />
//       //     <Stack.Screen name="user" component={UsersData} />
//       //     <Stack.Screen name="details" component={UserDetails} /> */}
//       //     <Stack.Screen name="signup" component={SignUp}
//       //       options={{
//       //         title: 'Softmax',
//       //         headerStyle: {
//       //           backgroundColor: '#fff',
//       //         },
//       //         headerTintColor: '#3498db',
//       //         headerTitleStyle: {
//       //           fontWeight: 'bold',
//       //           fontSize: 25,
//       //           alignSelf: 'center',
//       //         },
//       //       }} />
//       //     <Stack.Screen name="home" component={HomeScreen}
//       //       options={{
//       //         title: 'Softmax',
//       //         headerStyle: {
//       //           backgroundColor: '#fff',
//       //         },
//       //         headerTintColor: '#3498db',
//       //         headerTitleStyle: {
//       //           fontWeight: 'bold',
//       //           fontSize: 25,
//       //           alignSelf: 'center',
//       //         },
//       //       }} />
//       //   </Stack.Navigator>
//       // </NavigationContainer>
//     );
//   }
// }


import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import VIForegroundService from "@voximplant/react-native-foreground-service";
import PushController from './src/components/PushController'
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from "react-native-push-notification";



// type Props = {};
export default class App extends Component {
  constructor() {
    super()

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });


  }
  getPush = () => {
    PushNotification.localNotification({

      /* iOS and Android properties */
      title: "Home Work", // (optional)
      message: "Check HomeWork from Dairy", // (required)
      // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    });
  }

  async startService() {
    if (Platform.OS !== 'android') {
      console.log('Only Android platform is supported');
      return;
    }
    if (Platform.Version >= 26) {
      const channelConfig = {
        id: 'ForegroundServiceChannel',
        name: 'Notification Channel',
        description: 'Notification Channel for Foreground Service',
        enableVibration: false,
        importance: 2
      };
      await VIForegroundService.createNotificationChannel(channelConfig);

    }
    const notificationConfig = {
      id: 3456,
      title: 'Softmax',
      text: 'School App',
      icon: 'ic_notification',
      priority: 0
    };
    if (Platform.Version >= 26) {
      notificationConfig.channelId = 'ForegroundServiceChannel';
    }
    await VIForegroundService.startService(notificationConfig);
    console.log('done')
    BackgroundFetch.configure({
      minimumFetchInterval: 1,     // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: true,     // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, //get network
      requiresCharging: false,      // Default
      requiresDeviceIdle: false,    // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false  // Default
    }, async (taskId) => {
      console.log("[js] Received background-fetch event: ", taskId);
      let response = await fetch('https://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);
      this.getPush()
      // MyHeadlessTask()
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      // BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
    BackgroundFetch.scheduleTask({
      taskId: "com.foo.customtask",
      forceAlarmManager: true,
      delay: 500 // <-- milliseconds
    });

  }

  async stopService() {
    await VIForegroundService.stopService();
  }

  get = () => {
    // BackgroundFetch.configure({
    //   minimumFetchInterval: 1,     // <-- minutes (15 is minimum allowed)
    //   // Android options
    //   forceAlarmManager: true,     // <-- Set true to bypass JobScheduler.
    //   stopOnTerminate: false,
    //   startOnBoot: true,
    //   requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, //get network
    //   requiresCharging: false,      // Default
    //   requiresDeviceIdle: false,    // Default
    //   requiresBatteryNotLow: false, // Default
    //   requiresStorageNotLow: false  // Default
    // }, async (taskId) => {
    //   console.log("[js] Received background-fetch event: ", taskId);
    //   let response = await fetch('https://facebook.github.io/react-native/movies.json');
    //   let responseJson = await response.json();
    //   console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);
    //   this.getPush()
    //   // MyHeadlessTask()
    //   // Required: Signal completion of your task to native code
    //   // If you fail to do this, the OS can terminate your app
    //   // or assign battery-blame for consuming too much background-time
    //   // BackgroundFetch.finish(taskId);
    // }, (error) => {
    //   console.log("[js] RNBackgroundFetch failed to start");
    // });

    // // Optional: Query the authorization status.
    // BackgroundFetch.status((status) => {
    //   switch (status) {
    //     case BackgroundFetch.STATUS_RESTRICTED:
    //       console.log("BackgroundFetch restricted");
    //       break;
    //     case BackgroundFetch.STATUS_DENIED:
    //       console.log("BackgroundFetch denied");
    //       break;
    //     case BackgroundFetch.STATUS_AVAILABLE:
    //       console.log("BackgroundFetch is enabled");
    //       break;
    //   }
    // });
    // BackgroundFetch.scheduleTask({
    //   taskId: "com.foo.customtask",
    //   forceAlarmManager: true,
    //   delay: 500 // <-- milliseconds
    // });
  }


  render() {
    return (
      <View style={styles.container}>
        <Button title="Start foreground service" onPress={() => this.startService()} />
        <View style={styles.space} />
        <Button title="Stop foreground service" onPress={() => this.stopService()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  space: {
    flex: 0.1
  }
});
