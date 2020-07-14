// import React, { Component } from "react";
// import { Platform } from 'react-native';
// import BackgroundFetch from "react-native-background-fetch";
// import PushNotification from "react-native-push-notification";
// import VIForegroundService from "@voximplant/react-native-foreground-service";
// import { connect } from 'react-redux';
// import {
//     getDairyPics
// } from "../actions"

// class PushController extends Component {
//     constructor() {
//         super()


//         PushNotification.configure({
//             // (optional) Called when Token is generated (iOS and Android)
//             onRegister: function (token) {
//                 console.log("TOKEN:", token);
//             },

//             // (required) Called when a remote or local notification is opened or received
//             onNotification: function (notification) {
//                 console.log("NOTIFICATION:", notification);
//             },
//             permissions: {
//                 alert: true,
//                 badge: true,
//                 sound: true
//             },
//             popInitialNotification: true,
//             requestPermissions: true
//         });
//     }
//     getPush = () => {
//         PushNotification.localNotification({

//             /* iOS and Android properties */
//             title: "Home Work", // (optional)
//             message: "Check HomeWork from Dairy", // (required)
//             // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
//         });
//         // window.setInterval(async function () {
//         //     /// call your function here
//         //     let response = await fetch('https://facebook.github.io/react-native/movies.json');
//         //     let responseJson = await response.json();
//         //     console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);
//         //     PushNotification.localNotification({

//         //         /* iOS and Android properties */
//         //         title: "Home Work", // (optional)
//         //         message: "Check HomeWork from Dairy", // (required)
//         //         // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
//         //     });
//         // }, 1000);
//         // this.startService()
//     }


//     async startService() {

//         if (Platform.OS !== 'android') {
//             console.log('Only Android platform is supported');
//             return;
//         }
//         if (Platform.Version >= 26) {
//             const channelConfig = {
//                 id: 'ForegroundServiceChannel',
//                 name: 'Notification Channel',
//                 description: 'Notification Channel for Foreground Service',
//                 enableVibration: false,
//                 importance: 2
//             };
//             await VIForegroundService.createNotificationChannel(channelConfig);

//         }
//         const notificationConfig = {
//             id: 3456,
//             title: 'softmax',
//             text: 'School App',
//             icon: 'ic_notification',
//             priority: 0
//         };
//         if (Platform.Version >= 26) {
//             notificationConfig.channelId = 'ForegroundServiceChannel';
//         }
//         await VIForegroundService.startService(notificationConfig);
//         // VIForegroundService.createNotificationChannel
//         console.log('done')
//         // window.setInterval(async function () {
//         //     /// call your function here
//         //     let response = await fetch('https://facebook.github.io/react-native/movies.json');
//         //     let responseJson = await response.json();
//         //     console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);
//         //     PushNotification.localNotification({

//         //         /* iOS and Android properties */
//         //         title: "Home Work", // (optional)
//         //         message: "Check HomeWork from Dairy", // (required)
//         //         // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
//         //     });
//         // }, 1000);



//         BackgroundFetch.configure({
//             minimumFetchInterval: 1,     // <-- minutes (15 is minimum allowed)
//             // Android options
//             forceAlarmManager: true,     // <-- Set true to bypass JobScheduler.
//             stopOnTerminate: false,
//             startOnBoot: true,
//             requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, //get network
//             requiresCharging: false,      // Default
//             requiresDeviceIdle: false,    // Default
//             requiresBatteryNotLow: false, // Default
//             requiresStorageNotLow: false  // Default
//         }, async (taskId) => {
//             console.log("[js] Received background-fetch event: ", taskId);
//             // let response = await fetch('https://facebook.github.io/react-native/movies.json');
//             // let responseJson = await response.json();
//             // console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);
//             // await this.props.getDairyPics(this.props.userArr[0].class, this.props.userArr[0].school_name)
//             fetch("https://softmax.info/get_homework.php?school=" + this.props.userArr[0].school_name + "&class=" + this.props.userArr[0].class)
//                 .then((response) => response.json())
//                 .then((Homework) => {
//                     console.log(Homework)
//                     fetch("https://softmax.info/get_markspic.php?school=" + this.props.userArr[0].school_name + "&class=" + this.props.userArr[0].class)
//                         .then((response) => response.json())
//                         .then((pics) => {
//                             // console.log(pics)
//                             if (pics[0] == 'failure') {
//                                 return
//                             }
//                             let homework = this.props.homewrok
//                             let dairy = this.props.dairyPics
//                             console.log(homework)
//                             if (homework == Homework || dairy == pics) {
//                                 this.getPush()
//                             }
//                         })
//                         .catch((error) => {
//                             alert(error)
//                             // dispatch({ type: LOADING, payload: false })
//                         });
//                 })
//                 .catch((error) => {
//                     // console.error(error);
//                     alert(error)
//                     // dispatch({ type: LOADING, payload: false })
//                 });
//             // this.getPush()
//             // MyHeadlessTask()
//             // Required: Signal completion of your task to native code
//             // If you fail to do this, the OS can terminate your app
//             // or assign battery-blame for consuming too much background-time
//             BackgroundFetch.finish(taskId);
//         }, (error) => {
//             console.log("[js] RNBackgroundFetch failed to start");
//         });

//         // Optional: Query the authorization status.
//         BackgroundFetch.status((status) => {
//             switch (status) {
//                 case BackgroundFetch.STATUS_RESTRICTED:
//                     console.log("BackgroundFetch restricted");
//                     break;
//                 case BackgroundFetch.STATUS_DENIED:
//                     console.log("BackgroundFetch denied");
//                     break;
//                 case BackgroundFetch.STATUS_AVAILABLE:
//                     console.log("BackgroundFetch is enabled");
//                     break;
//             }
//         });
//         BackgroundFetch.scheduleTask({
//             taskId: "com.foo.customtask",
//             forceAlarmManager: true,
//             delay: 500 // <-- milliseconds
//         });

//     }

//     async stopService() {
//         await VIForegroundService.stopService();
//     }


//     componentDidMount() {
//         this.startService()
//         // this.stopService()

//     }

//     render() {
//         return null;
//     }
// }
// const mapStateTOProps = state => {
//     // console.log(state)
//     return {
//         number: state.auth.mobileNumber,
//         isLoading: state.auth.isLoading2,
//         userArr: state.auth.userArr,
//         notice: state.auth.notice,
//         schoolLogoUrl: state.auth.schoolLogoUrl,
//         pass: state.auth.password,
//         homework: state.auth.homework,
//         dairyPics: state.auth.dairyPics
//     }
// }
// export default connect(mapStateTOProps, {
//     getDairyPics
// })(PushController)
