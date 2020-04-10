import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StatusBar,
    ActivityIndicator
} from "react-native"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getGallaryData
} from "../actions"
import Loading from '../components/loading'
import { WebView } from 'react-native-webview'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Gallary extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { visible: true };
    // }

    componentDidMount() {
        let { userArr } = this.props
        if (this.props.gallary == null)
            this.props.getGallaryData(userArr[0].school_name)
        // this.props.getAttendance(userArr[0].student_id, userArr[0].school_name)
    }

    render() {
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
                                Total  {this.props.absentCount}  Absents
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
                        data={this.props.gallary}
                        // numColumns={2}
                        renderItem={({ item, index }) =>
                            <BooksList
                                // name={item.name}
                                title={item.title}
                                // marks={item.marks}
                                url={item.path}
                                showdata={() => Actions.showGallary({
                                    title: item.title,
                                    url: item.path,
                                    dis: item.description
                                })}
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
    // constructor(props) {
    //     super(props);
    //     this.state = { visible: true };
    // }

    // hideSpinner() {
    //     this.setState({ visible: false });
    // }
    ext = this.props.url.split('.').pop()
    render() {
        return (
            <View style={{}}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderBottomColor: 'gray',
                        height: 150,
                        alignItems: "center",
                        flexDirection: 'row'
                    }}
                    onPress={() => this.props.showdata()}
                >
                    {this.ext == "mp4" ?
                        <Image
                            source={require('../images/Video.png')}
                            style={{
                                height: 100,
                                width: 100,
                                marginLeft: 10,
                                resizeMode: 'contain',
                            }}
                        />
                        :
                        <Image
                            source={{ uri: this.props.url }}
                            style={{
                                height: 100,
                                width: 100,
                                marginLeft: 10,
                                resizeMode: 'contain',
                            }}
                        />

                    }


                    {/* <View
                        style={{ width: 100, height: 100 }}
                    >
                        <WebView
                            onLoad={() => this.hideSpinner()}
                            // source={{ uri: this.props.url }}
                            source={{
                                html: `
                                <video width="100%" height="100%"  controls>
                                    <source src="${this.props.url}" type="video/mp4">
                                </video>
                                `,
                            }}
                        // allowsInlineMediaPlayback={false}
                        />
                        {/* <Text>dhfkfhdkhfdkfhkdh</Text> */}
                    {/* </View> */}
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 20
                    }}>{this.props.title}</Text>
                    {/* <Text
                        style={{
                            position: 'absolute',
                            right: 20,
                        }}
                    >{this.props.marks}</Text> */}
                </TouchableOpacity>
                {/* {this.state.visible && (
                    <ActivityIndicator
                        style={{ position: "absolute", left: 10 }}
                        size='small'
                    />
                )} */}
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
        gallary: state.auth.gallary
    }
}
export default connect(mapStateTOProps, {
    getGallaryData
})(Gallary)