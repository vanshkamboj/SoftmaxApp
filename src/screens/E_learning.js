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
    getProfile
} from "../actions"
import Loading from "../components/loading"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Elearning extends Component {
    componentDidMount() {
        // this.props.otpChanged(null)
        // this.props.getProfile()
    }
    render() {
        // console.log(this.props.userArr[0].school_name)
        let color = '#2a017d'
        let { userArr } = this.props
        // changeNavigationBarColor(color)
        // hideNavigationBar()
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView
                // style={{ flex: 1 }}
                >
                    < StatusBar backgroundColor={color} barStyle='light-content' />
                    <View style={{ flex: 1, height: screenHeight, backgroundColor: 'lightgray' }}>
                        <View style={{ flex: 2, backgroundColor: color }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                margin: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>E_Learning</Text>
                                <TouchableOpacity
                                    onPress={() => Actions.Home()}
                                    style={{
                                        position: 'absolute',
                                        left: 10
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
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10
                            }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 25 }}>
                                        {userArr[0].school_name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex: 5,
                            backgroundColor: '#e0ae16',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: screenWidth,
                            // position: 'absolute'
                        }}>


                            <View style={{ position: 'absolute', bottom: 150 }} >
                                <TouchableOpacity
                                    style={styles.cards}
                                    onPress={() => Actions.video()}
                                >
                                    <Image
                                        source={require('../images/e-learning-video.png')}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            margin: 10,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>E-learning</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                    onPress={() => Actions.Books()}
                                >
                                    <Image
                                        source={require('../images/e-book.png')}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>E-Books</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                    onPress={() => Actions.test()}
                                >
                                    <Image
                                        source={require('../images/exam.png')}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Online Test</Text>

                                </TouchableOpacity>
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
    cards: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        width: screenWidth / 1.2,
        height: screenHeight / 6,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
        margin: 10,
        flexDirection: 'row'

    }
})

const mapStateTOProps = state => {
    // console.log(state)
    return {
        number: state.auth.mobileNumber,
        isLoading: state.auth.isLoading,
        userArr: state.auth.userArr
    }
}
export default connect(mapStateTOProps, {
    getProfile
})(Elearning)