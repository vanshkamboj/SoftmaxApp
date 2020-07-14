import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Modal,
    Dimensions
} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class Loading extends Component {
    render() {
        return (
            // <ActivityIndicator
            //     style={{}}
            //     size="large"
            // />
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

                    <View style={{ marginTop: 350, alignSelf: 'center' }}>
                        <View>
                            <ActivityIndicator size='large'
                                color="#45a0e6'" />
                        </View>
                    </View>
                </View>

            </Modal>
            // <View style={{ flex: 1 }}>
            //     <ActivityIndicator
            //         style={{}}
            //         size="large"
            //     />
            // </View>

        )
    }
}
