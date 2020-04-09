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
import TextTicker from 'react-native-text-ticker'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class DeshBoard extends Component {
    componentDidMount() {
        changeNavigationBarColor('#2a017d')
        // this.props.otpChanged(null)
        if (this.props.userArr == null) {
            this.props.getProfile()
            // this.props.getNotice(this.props.userArr[0].school_name)
        }
    }
    render() {
        // console.log(this.props.userArr[0].school_name)
        let color = '#2a017d'
        let { userArr } = this.props
        // changeNavigationBarColor(color)
        // hideNavigationBar()
        // console.log(this.props.schoolLogoUrl)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView
                // style={{ flex: 1 }}
                >
                    < StatusBar backgroundColor={color} barStyle='light-content' />
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
                                    // onPress={() => Actions.login()}
                                    style={{
                                        position: 'absolute',
                                        right: 5
                                    }}
                                >
                                    <Image
                                        source={require('../images/options.png')}
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
                                        source={{
                                            uri: this.props.schoolLogoUrl,
                                        }}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            margin: 10,
                                            resizeMode: 'contain',
                                            borderBottomLeftRadius: 20,
                                            borderBottomRightRadius: 20,
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                            // borderWidth: 1,
                                            borderColor: 'red'
                                        }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 25, width: screenHeight / 3 }}>
                                        {this.props.userArr !== null ? userArr[0].school_name : null}

                                    </Text>
                                    <Text style={{ color: '#e0ae16', fontSize: 18, width: screenHeight / 3 }}>
                                        {this.props.userArr !== null ? userArr[0].student_name : null}
                                        {/* {userArr[0].student_name} */}
                                    </Text>
                                    <Text style={{ color: '#e0ae16', fontSize: 18, width: screenHeight / 3 }}>
                                        {this.props.userArr !== null ? userArr[0].class : null}
                                        {/* {userArr[0].class} */}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flex: 5,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            // justifyContent: 'center'
                        }}>
                            {/* <TextTicker
                                style={{ fontSize: 24, marginVertical: 20 }}
                                duration={1000}
                                loop
                                bounce
                                repeatSpacer={50}
                                marqueeDelay={1000}
                                shouldAnimateTreshold={40}
                            >
                                Happy Birthday {userArr[0].student_name}
                            </TextTicker> */}
                            <TextTicker
                                style={{ fontSize: 24, marginVertical: 20 }}
                                duration={20000}
                                loop
                                bounce
                                repeatSpacer={50}
                                marqueeDelay={1000}
                            >
                                {this.props.notice}
                            </TextTicker>
                            <View style={{ flexDirection: 'row' }} >
                                <TouchableOpacity
                                    style={styles.cards}
                                    onPress={() => Actions.homeWork()}
                                >
                                    <Image
                                        source={require('../images/book.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Dairy</Text>
                                    {/* <Text style={{ fontWeight: 'bold' }}>(HomeWork)</Text> */}

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                >
                                    <Image
                                        source={require('../images/attendance.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Attendance</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                >
                                    <Image
                                        source={require('../images/gallery.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Gallary</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <TouchableOpacity
                                    style={styles.cards}
                                >
                                    <Image
                                        source={require('../images/statement.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Report Crad</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                    onPress={() => Actions.dairy()}
                                >
                                    <Image
                                        source={require('../images/book.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Dairy Pics</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                >
                                    <Image
                                        source={require('../images/syllabus.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Syllabus</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <TouchableOpacity
                                    style={styles.cards}
                                >
                                    <Image
                                        source={require('../images/test.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Marks</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                >
                                    <Image
                                        source={require('../images/notice.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Notice Board</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cards}
                                >
                                    <Image
                                        source={require('../images/clipboard.png')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            margin: 10,
                                            resizeMode: 'contain',

                                        }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>Time Table</Text>

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
        backgroundColor: '#e6e1e1',
        width: screenWidth / 3.5,
        height: screenHeight / 7,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2

    }
})

const mapStateTOProps = state => {
    // console.log(state)
    return {
        number: state.auth.mobileNumber,
        isLoading: state.auth.isLoading,
        userArr: state.auth.userArr,
        notice: state.auth.notice,
        schoolLogoUrl: state.auth.schoolLogoUrl
    }
}
export default connect(mapStateTOProps, {
    getProfile
})(DeshBoard)