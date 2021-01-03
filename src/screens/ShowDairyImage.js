import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  ScrollView,
  PixelRatio,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';
import {getDairyPics} from '../actions';
import {WebView} from 'react-native-webview';
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
  }

  hideSpinner() {
    this.setState({visible: false});
  }
  // constructor(props) {
  //     super(props);
  //     this.state = { visible: true };
  // }
  componentDidMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    // let ext = this.props.image.split('.').pop()
    let {userArr} = this.props;
    this.props.getDairyPics(userArr[0].class, userArr[0].school_name);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    Actions.Dairy();
    return true;
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
    fullscreen: true,
    playerWidth: Dimensions.get('window').width,
    visible: true,
    height: 301,
  };

  _youTubeRef = React.createRef();

  render() {
    let {userArr} = this.props;
    let ext;
    let color = '#2a017d';
    if (this.props.image !== null && this.props.image !== ' ') {
      ext = this.props.image.split('.').pop();
    } else {
      ext = 'video';
    }

    // console.log(this.props.image)
    // console.log(this.props.path)
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={color} barStyle="light-content" />
        <View style={{backgroundColor: color}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Dairy Images</Text>
            <TouchableOpacity
              onPress={() => Actions.Dairy()}
              style={{
                position: 'absolute',
                left: 10,
              }}>
              <Image
                source={require('../images/leftArrow.png')}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}>
            {/* <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                Total  {this.props.DairyPicsCount}  Images Found
                            </Text>
                        </View> */}
          </View>
        </View>
        <View
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: '#e0ae16',
            flex: 2,
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

          {ext == 'jpg' || ext == 'jpeg' || ext == 'png' ? (
            <WebView
              onLoad={() => this.hideSpinner()}
              source={{uri: 'https://softmax.info/' + this.props.image}}
              // source={{ uri: "https://docs.google.com/gview?embedded=true&url=http://softmax.info/" + this.props.image }}
              style={{flex: 2}}
              scalesPageToFit={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              decelerationRate="normal"
              startInLoadingState={true}
              automaticallyAdjustContentInsets={true}
            />
          ) : ext == 'pdf' || ext == 'docx' || ext == 'xlsx' || ext == 'doc' ? (
            <WebView
              onLoad={() => this.hideSpinner()}
              // source={{ uri: "https://softmax.info/" + this.props.image }}
              source={{
                uri:
                  'https://docs.google.com/gview?embedded=true&url=http://softmax.info/' +
                  this.props.image,
              }}
              style={{flex: 2}}
              scalesPageToFit={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              decelerationRate="normal"
              startInLoadingState={true}
              automaticallyAdjustContentInsets={true}
            />
          ) : (
            <YouTube
              ref={this._youTubeRef}
              // You must have an API Key for the player to load in Android
              apiKey="AIzaSyBLUq1fSTphnValWCrkA1rJjAzcZ3aBexw"
              // Un-comment one of videoId / videoIds / playlist.
              // You can also edit these props while Hot-Loading in development mode to see how
              // it affects the loaded native module
              videoId={this.props.path}
              // videoIds={['uMK0prafzw0', 'qzYgSecGQww', 'XXlZfc1TrD0', 'czcjU1w-c6k']}
              // playlistId="PLF797E961509B4EB5"
              play={this.state.isPlaying}
              loop={this.state.isLooping}
              fullscreen={this.state.fullscreen}
              controls={1}
              style={[
                // { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (14 / 9)) },
                {height: this.state.height},
                styles.player,
              ]}
              onError={e => {
                this.setState({error: e.error});
              }}
              onReady={e => {
                this.setState({isReady: true, visible: false, height: 299});
              }}
              onChangeState={e => {
                this.setState({status: e.state});
              }}
              onChangeQuality={e => {
                this.setState({quality: e.quality});
              }}
              // onChangeFullscreen={e => {
              //     this.setState({ fullscreen: e.isFullscreen });
              // }}
              onProgress={e => {
                this.setState({currentTime: e.currentTime});
              }}
            />
          )}

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
              style={{
                position: 'absolute',
                top: screenHeight / 2,
                left: screenWidth / 2,
              }}
              size="large"
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
    width: screenWidth,
  },
});

const mapStateTOProps = state => {
  // console.log(state)
  return {
    number: state.auth.mobileNumber,
    isLoading: state.auth.isLoading,
    userArr: state.auth.userArr,
    DairyPics: state.auth.DairyPics,
    DairyPicsCount: state.auth.DairyPicsCount,
  };
};
export default connect(
  mapStateTOProps,
  {
    getDairyPics,
  },
)(ShowDairyPics);
