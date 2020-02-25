import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity
} from 'react-native';

export default class Mobilenumber extends Component {
    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={styles.topContainer}></View>
                {/* <View style={styles.bottomContainer}></View> */}
                <View style={styles.centerContainer}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: .5,
        backgroundColor: "green"
    },
    centerContainer: {
        backgroundColor: 'red',
        alignSelf: 'center',
        flex: .5
        // height: 500,
        // width: 350,
        // marginTop: 300
    }
})