import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    TextInput,
    StatusBar,
    Image
} from 'react-native'
import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
} from 'react-native-navigation-bar-color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import {
    numberChanged,
    logInUser
} from "../actions"
import Loading from "../components/loading"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class DeshBoard extends Component {
    componentDidMount() {
        // this.props.otpChanged(null)
    }
    render() {
        let color = '#2a017d'
        let { otp, confirmResult } = this.props
        // changeNavigationBarColor(color)
        // hideNavigationBar()
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView
                // style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, height: screenHeight }}>
                        <View style={{ flex: 2, backgroundColor: color }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                margin: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Home</Text>
                                <TouchableOpacity
                                    onPress={() => Actions.login()}
                                    style={{
                                        position: 'absolute',
                                        right: 5
                                    }}
                                >
                                    <Image
                                        source={require('../images/leftArrow.png')}
                                        style={{
                                            height: 30,
                                            width: 30,
                                        }}
                                    />

                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Image
                                        source={require('../images/bulb.png')}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            margin: 10,
                                            resizeMode: 'contain',
                                            borderWidth: 1,
                                            borderColor: 'red'
                                        }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 25 }}>School Name</Text>
                                    <Text style={{ color: 'white', fontSize: 18 }}>Student Name</Text>
                                    <Text style={{ color: 'white', fontSize: 18 }}>Class Name</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 5, }}>

                        </View>
                        <View>
                            {this.props.isLoading ? <Loading /> : null}
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    radiusBorder: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    }
})

const mapStateTOProps = state => {
    // console.log(state)
    return {
        number: state.auth.mobileNumber,
        isLoading: state.auth.isLoading
    }
}
export default connect(mapStateTOProps, {
    numberChanged,
    logInUser
})(DeshBoard)