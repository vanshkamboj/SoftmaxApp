import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StatusBar,
} from "react-native"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getMarks
} from "../actions"
import Loading from '../components/loading'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Marks extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { visible: true };
    // }
    componentDidMount() {
        let { userArr } = this.props
        if (this.props.marks == null)
            this.props.getMarks(userArr[0].school_name, userArr[0].student_id)
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
                        <Text style={{ color: 'white', fontSize: 20 }}>Marks</Text>
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
                    >

                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginLeft: 20
                        }}>Exam Name</Text>
                        <Text
                            style={{
                                position: 'absolute',
                                right: 20,
                                fontWeight: 'bold',
                            }}
                        >Marks</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: '#e0ae16',
                    flex: 2
                }}>
                    <FlatList
                        data={this.props.marks}
                        // numColumns={2}
                        renderItem={({ item, index }) =>
                            <BooksList
                                // name={item.name}
                                examName={item.exam_name}
                                marks={item.marks}
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
                >
                    {/* <Image
                        source={require('../images/gallery.png')}
                        style={{
                            height: 30,
                            width: 30,
                            marginLeft: 10,
                            resizeMode: 'contain',
                        }}
                    /> */}
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 20
                    }}>{this.props.examName}</Text>
                    <Text
                        style={{
                            position: 'absolute',
                            right: 20,
                        }}
                    >{this.props.marks}</Text>
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
        marks: state.auth.marks
    }
}
export default connect(mapStateTOProps, {
    getMarks
})(Marks)