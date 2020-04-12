import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    BackHandler
} from "react-native"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getDairyPics
} from "../actions"
import { WebView } from 'react-native-webview'
// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
// import OpenFile from 'react-native-doc-viewer'
// import ImageZoom from 'react-native-image-pan-zoom'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ShowDairyPics extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }

    hideSpinner() {
        this.setState({ visible: false });
    }
    // constructor(props) {
    //     super(props);
    //     this.state = { visible: true };
    // }
    componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        let ext = this.props.image.split('.').pop()
        let { userArr } = this.props
        this.props.getDairyPics(userArr[0].class, userArr[0].school_name)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        Actions.dairy()
        return true;
    }


    render() {
        let { userArr } = this.props
        let color = '#2a017d'
        let ext = this.props.image.split('.').pop()
        // alert(ext)
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
                        <Text style={{ color: 'white', fontSize: 20 }}>Dairy Images</Text>
                        <TouchableOpacity
                            onPress={() => Actions.dairy()}
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
                        {/* <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                Total  {this.props.dairyPicsCount}  Images Found
                            </Text>
                        </View> */}
                    </View>

                </View>
                <View style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: '#e0ae16',
                    flex: 2
                }}>
                    {/* <Text>{this.props.image}</Text> */}

                    {/* <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={screenWidth}
                        imageHeight={screenHeight / 1.2}> */}
                    {/* <Image
                        source={{
                            uri: "https://softmax.info/" + this.props.image,
                        }}
                        style={{
                            height: screenHeight / 1.2,
                            width: screenWidth,
                            // margin: 10,
                            resizeMode: 'contain',
                        }}
                    /> */}
                    {/* </ImageZoom> */}

                    {ext == "jpg" || ext == "jpeg" || ext == "png" ?
                        <WebView
                            onLoad={() => this.hideSpinner()}

                            source={{ uri: "https://softmax.info/" + this.props.image }}
                            // source={{ uri: "https://docs.google.com/gview?embedded=true&url=http://softmax.info/" + this.props.image }}
                            style={{ flex: 2 }}
                            scalesPageToFit={true}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
                            startInLoadingState={true}
                            automaticallyAdjustContentInsets={true} />
                        :
                        <WebView
                            onLoad={() => this.hideSpinner()}

                            // source={{ uri: "https://softmax.info/" + this.props.image }}
                            source={{ uri: "https://docs.google.com/gview?embedded=true&url=http://softmax.info/" + this.props.image }}
                            style={{ flex: 2 }}
                            scalesPageToFit={true}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
                            startInLoadingState={true}
                            automaticallyAdjustContentInsets={true} />
                    }

                    {/* // startInLoadingState={true}
                        // ref={ref => { this.webView = ref; }}
                        onError={() => {
                            <WebView
                                onLoad={() => this.hideSpinner()}

                                // source={{ uri: "https://softmax.info/" + this.props.image }}
                                source={{ uri: "https://docs.google.com/gview?embedded=true&url=http://softmax.info/" + this.props.image }}
                                style={{ flex: 2 }}
                                scalesPageToFit={true}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                decelerationRate="normal"
                                startInLoadingState={true}
                                automaticallyAdjustContentInsets={true}
                            // startInLoadingState={true}
                            // ref={ref => { this.webView = ref; }}
                            // onError={() => { }}
                            />

                        }} */}
                    {/* /> */}
                    {this.state.visible && (
                        <ActivityIndicator
                            style={{ position: "absolute", top: screenHeight / 2, left: screenWidth / 2 }}
                            size="large"
                        />
                    )}


                </View>

            </View>

        )
    }
}


const mapStateTOProps = state => {
    // console.log(state)
    return {
        number: state.auth.mobileNumber,
        isLoading: state.auth.isLoading,
        userArr: state.auth.userArr,
        dairyPics: state.auth.dairyPics,
        dairyPicsCount: state.auth.dairyPicsCount
    }
}
export default connect(mapStateTOProps, {
    getDairyPics
})(ShowDairyPics)