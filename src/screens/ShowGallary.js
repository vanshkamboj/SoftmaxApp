import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    StatusBar,
    BackHandler,
    ScrollView,
    PixelRatio,
    StyleSheet
} from "react-native";
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getProfile
} from "../actions"
// import YoutubePlayer from "react-native-yt-player";
// import { YouTubeStandaloneAndroid } from 'react-native-youtube';
// import YouTube from 'react-native-youtube';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ShowGallary extends Component {
    constructor(props) {
        super(props);
        // this.state = { visible: true };
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
    onFullScreen = fullScreen => {
        console.log("fullscreen ", fullScreen);
    };
    state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: true,
        isLooping: true,
        duration: 0,
        currentTime: 0,
        fullscreen: false,
        playerWidth: Dimensions.get('window').width,
        visible: true
    };

    _youTubeRef = React.createRef();
    render() {
        // alert(this.props.uri)
        let { userArr } = this.props
        let color = '#2a017d'
        let ext = this.props.url.split('.').pop()
        // console.log(this.props.url)
        return (
            <View style={{}}>
                <ScrollView>
                    < StatusBar backgroundColor={color} barStyle='light-content' />
                    <View style={{ backgroundColor: color }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            margin: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Gallery</Text>
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
                        style={{ height: screenHeight / 2, backgroundColor: 'black' }}
                    >
                        {
                            ext == "jpg" || ext == "jpeg" || ext == "png" ?
                                <WebView
                                    onLoad={() => this.hideSpinner()}
                                    source={{ uri: this.props.url }}
                                // source={{ uri: "https://www.youtube.com/watch?v=VeAK7Bv4F1o" }}
                                />
                                :
                                <YouTube
                                    ref={this._youTubeRef}
                                    // You must have an API Key for the player to load in Android
                                    apiKey="AIzaSyBLUq1fSTphnValWCrkA1rJjAzcZ3aBexw"
                                    // Un-comment one of videoId / videoIds / playlist.
                                    // You can also edit these props while Hot-Loading in development mode to see how
                                    // it affects the loaded native module
                                    // videoId={"8nTPX3piKM4"}
                                    videoId={this.props.url}
                                    // videoIds={['uMK0prafzw0', 'qzYgSecGQww', 'XXlZfc1TrD0', 'czcjU1w-c6k']}
                                    // playlistId="PLF797E961509B4EB5"
                                    play={this.state.isPlaying}
                                    loop={this.state.isLooping}
                                    fullscreen={this.state.fullscreen}
                                    controls={1}
                                    style={[
                                        { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (14 / 9)) },
                                        styles.player
                                    ]}
                                    onError={e => {
                                        this.setState({ error: e.error });
                                    }}
                                    onReady={e => {
                                        this.setState({ isReady: true, visible: false });
                                    }}
                                    onChangeState={e => {
                                        this.setState({ status: e.state });
                                    }}
                                    onChangeQuality={e => {
                                        this.setState({ quality: e.quality });
                                    }}
                                    // onChangeFullscreen={e => {
                                    //     this.setState({ fullscreen: e.isFullscreen });
                                    // }}
                                    onProgress={e => {
                                        this.setState({ currentTime: e.currentTime });
                                    }}
                                />

                        }

                        {/* <Text>dhfkfhdkhfdkfhkdh</Text> */}


                        {/* <YoutubePlayer
                            loop
                            topBar={TopBar}
                            videoId="Z1LmpiIGYNs"
                            autoPlay
                            onFullScreen={this.onFullScreen}
                            onStart={() => console.log("onStart")}
                            onEnd={() => alert("on End")}
                        /> */}
                        {/* <YouTube
                            videoId="v=ce7EXvherHU" // The YouTube video ID
                            play // control playback of video with true/false
                            fullscreen // control whether the video should play in fullscreen or inline
                            loop // control whether the video should loop when ended
                        // onReady={e => this.setState({ isReady: true })}
                        // onChangeState={e => this.setState({ status: e.state })}
                        // onChangeQuality={e => this.setState({ quality: e.quality })}
                        // onError={e => this.setState({ error: e.error })}
                        // style={{ alignSelf: 'stretch', height: 300 }}
                        /> */}


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
                </ScrollView>
            </View>
            // <WebView
            //     // source={{ uri: 'https://softmax.info/Schools/' + userArr[0].school_name + '/' + userArr[0].class + '.php' }}
            //     style={{ marginTop: 20, backgroundColor: 'red' }}
            // />
        )
    }
}
const styles = StyleSheet.create({
    player: {
        alignSelf: 'stretch',
        marginVertical: 10,
    },
});

const TopBar = ({ play, fullScreen }) => (
    <View
        style={{
            alignSelf: "center",
            position: "absolute",
            top: 0
        }}
    >
        <Text style={{ color: "#FFF" }}> Custom Top bar</Text>
    </View>
);


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