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
    Alert
} from "react-native"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
    getBooks
} from "../actions"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Books extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { visible: true };
    // }
    componentDidMount() {
        let { userArr } = this.props
        if (this.props.Books == null)
            this.props.getBooks(userArr[0].class, userArr[0].medium)
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        Actions.Home()
        return true;
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
                        <Text style={{ color: 'white', fontSize: 20 }}>Books</Text>
                        <TouchableOpacity
                            onPress={() => Actions.E_learning()}
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
                                Total  {this.props.BooksCount}  Books Found
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
                        data={this.props.Books}
                        // numColumns={2}
                        renderItem={({ item, index }) =>
                            <BooksList
                                subject={item.subject}
                                onSubjectSelect={() => Actions.BooksSubject({ subject: item.subject })}
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
        Books: state.auth.books,
        BooksCount: state.auth.booksCount
    }
}
export default connect(mapStateTOProps, {
    getBooks
})(Books)