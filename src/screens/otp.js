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
} from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import {
    otpChanged,
    otpVerification
} from "../actions"
import Loading from "../components/loading"

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


class Otp extends Component {
    componentDidMount() {
        this.props.otpChanged(null)
    }
    render() {
        let color = '#2a017d'
        let { otp, confirmResult } = this.props
        // changeNavigationBarColor(color)
        // hideNavigationBar()
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, backgroundColor: color, paddingHorizontal: 30 }}
                >
                    <View style={{ height: screenHeight }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            margin: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>VERIFICATION</Text>
                            <TouchableOpacity
                                onPress={() => Actions.login()}
                                style={{
                                    position: 'absolute',
                                    left: 1
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
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{
                                backgroundColor: color,
                                alignItems: 'center',
                                // justifyContent: 'center',
                                paddingHorizontal: 25
                            }}>
                                < StatusBar backgroundColor={color} barStyle='light-content' />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}>We send you a code to verify your</Text>
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    marginBottom: 100
                                }}>mobile number</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>
                                    Enter your OTP Code here
                            </Text>


                                {/* Text Input for otp for 6 digites */}

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TextInput
                                        style={[{
                                            width: screenWidth / 8,
                                            backgroundColor: '#757eeb',
                                            height: 55,
                                            textAlign: 'center',
                                            color: 'white',
                                            marginRight: 5,
                                        }, styles.radiusBorder]}
                                        ref="input_1"
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onChangeText={value => {
                                            this.props.otpChanged(otp + value * 10000)
                                            // this.setState({ otp: this.state.otp + value * 10000 })
                                            if (value) this.refs.input_2.focus(); //for go to next input text
                                            if (value.length === 0) {
                                                this.props.otpChanged(0)
                                            }
                                        }}
                                    />
                                    <TextInput
                                        style={[{
                                            width: screenWidth / 8,
                                            backgroundColor: '#757eeb',
                                            height: 55,
                                            textAlign: 'center',
                                            color: 'white',
                                            marginRight: 5,
                                        }, styles.radiusBorder]}
                                        ref="input_2"
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onChangeText={value => {
                                            this.props.otpChanged(otp + value * 1000)
                                            // this.setState({ otp: this.state.otp + value * 1000 })
                                            if (value) this.refs.input_3.focus(); //for go to next input text
                                            if (value.length === 0) {
                                                this.refs.input_1.focus()
                                                this.props.otpChanged(otp - otp % 100000)
                                            }
                                        }}
                                    />
                                    <TextInput
                                        style={[{
                                            width: screenWidth / 8,
                                            backgroundColor: '#757eeb',
                                            height: 55,
                                            textAlign: 'center',
                                            color: 'white',
                                            marginRight: 5,
                                        }, styles.radiusBorder]}
                                        ref="input_3"
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onChangeText={value => {
                                            this.props.otpChanged(otp + value * 100)
                                            // this.setState({ otp: this.state.otp + value * 100 })
                                            if (value) this.refs.input_4.focus(); //for go to next input text
                                            if (value.length === 0) {
                                                this.refs.input_2.focus()
                                                this.props.otpChanged(otp - otp % 10000)
                                            }
                                        }}
                                    />
                                    <TextInput
                                        style={[{
                                            width: screenWidth / 8,
                                            backgroundColor: '#757eeb',
                                            height: 55,
                                            textAlign: 'center',
                                            color: 'white',
                                            marginRight: 5,
                                        }, styles.radiusBorder]}
                                        ref="input_4"
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onChangeText={value => {
                                            this.props.otpChanged(otp + value * 10)
                                            // this.setState({ otp: this.state.otp + value * 10 })
                                            if (value) this.refs.input_5.focus(); //for go to next input text
                                            if (value.length === 0) {
                                                this.refs.input_3.focus()
                                                this.props.otpChanged(otp - otp % 1000)
                                            }
                                        }}
                                    />
                                    <TextInput
                                        style={[{
                                            width: screenWidth / 8,
                                            backgroundColor: '#757eeb',
                                            height: 55,
                                            textAlign: 'center',
                                            color: 'white',
                                            marginRight: 5,
                                        }, styles.radiusBorder]}
                                        ref="input_5"
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onChangeText={value => {
                                            this.props.otpChanged(otp + value * 1)
                                            // this.setState({ otp: this.state.otp + value * 1 })
                                            if (value) this.refs.input_6.focus(); //for go to next input text
                                            if (value.length === 0) {
                                                this.refs.input_4.focus()
                                                this.props.otpChanged(otp - otp % 100)
                                            }
                                        }}
                                    />
                                    <TextInput
                                        style={[{
                                            width: screenWidth / 8,
                                            backgroundColor: '#757eeb',
                                            height: 55,
                                            textAlign: 'center',
                                            color: 'white',
                                            marginRight: 5,
                                        }, styles.radiusBorder]}
                                        ref="input_6"
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        // onKeyPress={this.refs.input_5.focus()}
                                        onChangeText={value => {
                                            this.props.otpChanged(otp + value)
                                            // this.setState({ otp: this.state.otp + value })
                                            // if (value) this.refs.input_2.focus(); //for go to next input text
                                            if (value.length === 0) {
                                                this.refs.input_5.focus()
                                                this.props.otpChanged(otp - otp % 10)
                                            }
                                        }}
                                    />


                                </View>
                                <TouchableOpacity
                                    style={[{
                                        backgroundColor: '#e0ae16',
                                        width: screenWidth / 1.2,
                                        marginTop: 10,
                                        height: 55,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        paddingHorizontal: 30
                                    }, styles.radiusBorder]}
                                    onPress={() => this.props.otpVerification(confirmResult, otp)}
                                >
                                    <Text style={{ fontWeight: 'bold' }}>SUBMIT</Text>
                                    <Image
                                        source={require('../images/rightArrow.png')}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            position: 'absolute',
                                            right: 20
                                        }}
                                    />
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity>
                                        <Text style={{
                                            color: '#e0ae16',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            marginTop: 30
                                        }}>Resend Code</Text>

                                    </TouchableOpacity>

                                </View>
                            </View>
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
        otp: state.auth.otp,
        sLoading: state.auth.isLoading,
        confirmResult: state.auth.confirmResult
    }
}
export default connect(mapStateTOProps, {
    otpChanged,
    otpVerification
})(Otp)