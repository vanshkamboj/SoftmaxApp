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
    getBooksSubject
} from "../actions"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class BooksSubject extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { visible: true };
    // }
    componentDidMount() {
        let { userArr } = this.props
        console.log("-----------------------------------------------")
        console.log(this.props.BooksSubject)
        // if (this.props.BooksSubject == null)
        // this.props.getBooks(userArr[0].class, userArr[0].medium)
        this.props.getBooksSubject(userArr[0].class, userArr[0].medium, this.props.subject)
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
                        <Text style={{ color: 'white', fontSize: 20 }}>BooksSubject</Text>
                        <TouchableOpacity
                            onPress={() => Actions.Books()}
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
                                Total  {this.props.BooksSubjectCount}  Found
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: '#e0ae16',
                    flex: 2
                }}>
                    <FlatList
                        data={this.props.BooksSubject}
                        // numColumns={2}
                        renderItem={({ item, index }) =>
                            <BooksList
                                subject={item.chapter}
                                onSubjectSelect={() => Actions.ViewBook({ uri: item.url })}
                            // onSubjectSelect={() => alert(item.url)}
                            />
                        }
                        keyExtractor={(index, item) => index + item}
                    >

                    </FlatList>

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
                        source={require('../images/e-book.png')}
                        style={{
                            height: 30,
                            width: 30,
                            marginLeft: 10,
                            resizeMode: 'contain',
                        }}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>{this.props.subject}</Text>
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
        BooksSubject: state.auth.booksSubject,
        BooksSubjectCount: state.auth.booksSubjectCount
    }
}
export default connect(mapStateTOProps, {
    getBooksSubject
})(BooksSubject)