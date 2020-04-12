import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    StatusBar,
    BackHandler
} from "react-native";
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getProfile
} from "../actions"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ShowGallary extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }

    hideSpinner() {
        this.setState({ visible: false });
    }
    componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        // let ext = this.props.image.split('.').pop()
        // this.props.getDairyPics(userArr[0].class, userArr[0].school_name)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        Actions.gallary()
        return true;
    }
    render() {
        // alert(this.props.uri)
        let { userArr } = this.props
        let color = '#2a017d'
        return (
            <View style={{ flex: 1 }}>
                < StatusBar backgroundColor={color} barStyle='light-content' />
                <View style={{ backgroundColor: color }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 10,
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Gallary</Text>
                        <TouchableOpacity
                            onPress={() => Actions.gallary()}
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
                        margin: 10
                    }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                {this.props.title}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{ width: screenWidth, height: screenHeight / 2 }}
                >
                    <WebView
                        onLoad={() => this.hideSpinner()}
                        source={{ uri: this.props.url }}
                    />
                    {/* <Text>dhfkfhdkhfdkfhkdh</Text> */}
                </View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    alignSelf: 'center'
                }}>Description</Text>
                <Text style={{ marginHorizontal: 10 }}>{this.props.dis}</Text>
                {this.state.visible && (
                    <ActivityIndicator
                        style={{ position: "absolute", top: screenHeight / 2, left: screenWidth / 2 }}
                        size="large"
                    />
                )}
            </View>
            // <WebView
            //     // source={{ uri: 'https://softmax.info/Schools/' + userArr[0].school_name + '/' + userArr[0].class + '.php' }}
            //     style={{ marginTop: 20, backgroundColor: 'red' }}
            // />
        )
    }
}
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
})(ShowGallary)