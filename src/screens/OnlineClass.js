import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StatusBar,
    BackHandler,
    Linking
} from "react-native"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getZoomClass
} from "../actions"
import Loading from '../components/loading'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class OnlineClass extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { visible: true };
    // }
    componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        let { userArr } = this.props
        // if (this.props.dairyPics == null)
        this.props.getZoomClass(userArr[0].class, userArr[0].school_name)

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        // Actions.Home()
        return true;
    }

    render() {
        let { zoom } = this.props
        let color = '#2a017d'
        // console.log(zoom)
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
                        <Text style={{ color: 'white', fontSize: 20 }}>Online Class</Text>
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
                    {/* <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 10
                    }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                Total  {this.props.dairyPicsCount}  Images Found
                            </Text>
                        </View>
                    </View> */}

                </View>
                <View style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: '#e0ae16',
                    flex: 2
                }}>
                    <FlatList
                        data={zoom}
                        // numColumns={2}
                        renderItem={({ item, index }) =>
                            <BooksList
                                name={item.comment}
                                date={item.meeting_date}
                                time={item.meeting_timing}
                                // onSubjectSelect={() => Actions.dairyPics({ image: item.image, path: item.path })}
                                onSubjectSelect={() => Linking.openURL(item.zoom_url)}
                            />
                        }
                        keyExtractor={(index, item) => index + item}
                    >

                    </FlatList>

                </View>
                <View>
                    {this.props.isLoading ? <Loading /> : null}
                </View>

            </View>

        )
    }
}

class BooksList extends Component {
    render() {
        return (
            <View style={{}}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderBottomColor: 'gray',
                        height: 50,
                        alignItems: "center",
                        flexDirection: 'row'
                    }}
                    onPress={() => this.props.onSubjectSelect()}
                >
                    <Image
                        source={require('../images/zoom.png')}
                        style={{
                            height: 30,
                            width: 30,
                            marginLeft: 10,
                            resizeMode: 'contain',
                        }}
                    />
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>{this.props.name}</Text>
                    <Text
                        style={{
                            position: 'absolute',
                            right: 10,
                            color: 'gray'
                        }}
                    >{this.props.date}</Text>
                    <Text
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 30,
                            color: 'gray',
                        }}
                    >{this.props.time}</Text>
                </TouchableOpacity>
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
        zoom: state.auth.zoom
    }
}
export default connect(mapStateTOProps, {
    getZoomClass
})(OnlineClass)