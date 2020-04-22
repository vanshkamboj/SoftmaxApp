import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component {
    constructor() {
        super()


        // PushNotification.configure({
        //     // (optional) Called when Token is generated (iOS and Android)
        //     onRegister: function (token) {
        //         console.log("TOKEN:", token);
        //     },

        //     // (required) Called when a remote or local notification is opened or received
        //     onNotification: function (notification) {
        //         console.log("NOTIFICATION:", notification);
        //     },
        //     permissions: {
        //         alert: true,
        //         badge: true,
        //         sound: true
        //     },
        //     popInitialNotification: true,
        //     requestPermissions: true
        // });
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification here

                // required on iOS only 
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: "939294048963",
            // iOS only
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
    componentDidMount() {
        // this.getPush()
        // PushNotification.configure({
        //     // (optional) Called when Token is generated (iOS and Android)
        //     onRegister: function (token) {
        //         console.log("TOKEN:", token);
        //     },

        //     // (required) Called when a remote or local notification is opened or received
        //     onNotification: function (notification) {
        //         console.log("NOTIFICATION:", notification);

        //         // process the notification here

        //         // required on iOS only 
        //         // notification.finish(PushNotificationIOS.FetchResult.NoData);
        //     },
        //     // Android only
        //     senderID: "939294048963",
        //     // iOS only
        //     permissions: {
        //         alert: true,
        //         badge: true,
        //         sound: true
        //     },
        //     popInitialNotification: true,
        //     requestPermissions: true
        // });
    }

    render() {
        return null;
    }
}