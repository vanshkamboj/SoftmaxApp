import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    StatusBar
} from "react-native";
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getProfile
} from "../actions"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ShowReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }

    hideSpinner() {
        this.setState({ visible: false });
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
                        <Text style={{ color: 'white', fontSize: 20 }}>Reportcard</Text>
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
                <WebView
                    onLoad={() => this.hideSpinner()}
                    source={{ uri: "https://docs.google.com/gview?embedded=true&url=https://softmax.info/uploaded/" + userArr[0].school_name + "/" + userArr[0].student_id + ".pdf" }}
                    style={{ flex: 2 }}
                />
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
})(ShowReportCard)