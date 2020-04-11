import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    TextInput,
    StatusBar,
    Image,
    Modal,
    FlatList
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import {
    getProfile,
    reset
} from "../actions"
import Loading from "../components/loading"
import AsyncStorage from '@react-native-community/async-storage'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Profile extends Component {
    state = {
        ModalVisible: false,
    }
    componentDidMount() {
        // this.props.otpChanged(null)
        // this.props.getProfile()
    }
    // changeStudent = (number, id) => {
    //     this.props.reset(number, id)
    // }
    changeStudent = async (number, id) => {

        try {
            // const value = await AsyncStorage.getItem('islogin')
            await AsyncStorage.setItem('number', number)
            await AsyncStorage.setItem('pass', id)
            this.props.reset()
            // Actions.Home()
        } catch (e) {
            // error reading value
            alert(e)
        }
    }
    render() {
        // console.log(this.props.userArr[0].school_name)
        let color = '#2a017d'
        let { userArr } = this.props
        // changeNavigationBarColor(color)
        // hideNavigationBar()
        // console.log(userArr)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView
                // style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, height: screenHeight, backgroundColor: 'lightgray' }}>
                        < StatusBar backgroundColor={color} barStyle='light-content' />
                        <View style={{ flex: 2, backgroundColor: color }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                margin: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Profile</Text>
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
                                    <Image
                                        source={require('../images/user.png')}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            margin: 10,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex: 4,
                            backgroundColor: '#e0ae16',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderBottomLeftRadius: screenWidth,
                            // position: 'absolute'
                        }}>


                            <View style={{ position: 'absolute', bottom: 150 }} >
                                <View
                                    style={styles.cards}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'lightgray',
                                            height: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10
                                        }}
                                    >

                                        <Text style={{ fontWeight: 'bold' }}>Student's Information</Text>
                                    </View>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{
                                            borderColor: 'white',
                                            borderBottomColor: 'lightgray',
                                            borderWidth: 2,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ color: 'lightgray', fontWeight: 'bold' }}>Name</Text>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                position: 'absolute',
                                                right: 10
                                            }}>
                                                {this.props.userArr !== null ? userArr[0].student_name !== "" ? userArr[0].student_name : "__" : null}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{
                                            borderColor: 'white',
                                            borderBottomColor: 'lightgray',
                                            borderWidth: 2,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ color: 'lightgray', fontWeight: 'bold' }}>Father's Name</Text>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                position: 'absolute',
                                                right: 10
                                            }}>
                                                {this.props.userArr !== null ? userArr[0].father_name !== "" ? userArr[0].father_name : "__" : null}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{
                                            borderColor: 'white',
                                            borderBottomColor: 'lightgray',
                                            borderWidth: 2,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ color: 'lightgray', fontWeight: 'bold' }}>Date of Birth</Text>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                position: 'absolute',
                                                right: 10
                                            }}>
                                                {this.props.userArr !== null ? userArr[0].dob !== "" ? userArr[0].dob : "__" : null}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{
                                            borderColor: 'white',
                                            borderBottomColor: 'lightgray',
                                            borderWidth: 2,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ color: 'lightgray', fontWeight: 'bold' }}>Class</Text>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                position: 'absolute',
                                                right: 10
                                            }}>
                                                {this.props.userArr !== null ? userArr[0].class !== "" ? userArr[0].class : "__" : null}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{
                                            borderColor: 'white',
                                            borderBottomColor: 'lightgray',
                                            borderWidth: 2,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ color: 'lightgray', fontWeight: 'bold' }}>Roll Number</Text>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                position: 'absolute',
                                                right: 10
                                            }}>
                                                {this.props.userArr !== null ? userArr[0].student_id !== "" ? userArr[0].student_id : "__" : null}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{
                                            borderColor: 'white',
                                            borderBottomColor: 'lightgray',
                                            borderWidth: 2,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ color: 'lightgray', fontWeight: 'bold' }}>Medium</Text>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                position: 'absolute',
                                                right: 10
                                            }}>
                                                {this.props.userArr !== null ? userArr[0].medium !== "" ? userArr[0].medium : "__" : null}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{
                                            borderColor: 'white',
                                            borderBottomColor: 'lightgray',
                                            borderWidth: 2,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ color: 'lightgray', fontWeight: 'bold' }}>Change Student</Text>
                                            <View
                                                style={{ position: 'absolute', right: 10 }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ ModalVisible: true })}
                                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        // position: 'absolute',
                                                        // right: 10
                                                    }}>
                                                        Click here
                                            </Text>
                                                </TouchableOpacity>


                                            </View>

                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View>
                            {this.props.isLoading ? <Loading /> : null}
                        </View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.ModalVisible}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ marginHorizontal: 30, marginTop: 200 }}>
                                    <View style={styles.model}>
                                        <View style={[styles.model, { height: screenHeight / 3 }]}>
                                            <Text style={styles.modelText}>Students List</Text>
                                            {/* <DatePicker
                                                style={{ width: screenWidth / 2, alignSelf: 'center' }}
                                                date={this.state.date}
                                                // onDateChange={(date) => this.setState({ date: date })}
                                                onDateChange={(date) => this.getDate(date)}
                                                mode={'date'}
                                            /> */}
                                            <FlatList
                                                style={{ width: screenWidth / 2, alignSelf: 'center' }}
                                                data={this.props.allStudents}
                                                // numColumns={2}
                                                renderItem={({ item, index }) =>
                                                    <View>
                                                        <TouchableOpacity
                                                            style={{
                                                                margin: 2,
                                                                backgroundColor: 'white',
                                                                height: 50,
                                                                justifyContent: 'center',
                                                                borderBottomLeftRadius: 30,
                                                                borderBottomRightRadius: 30,
                                                                borderTopLeftRadius: 30,
                                                                borderTopRightRadius: 30,
                                                            }}
                                                            onPress={() => {
                                                                this.setState({ ModalVisible: false })
                                                                this.changeStudent(item.mobile, item.student_id)
                                                            }}
                                                        >
                                                            <Text style={{ marginLeft: 10 }}>{item.student_name}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                                keyExtractor={(index, item) => index + item}
                                            >

                                            </FlatList>
                                            <View style={{ paddingHorizontal: 50, marginVertical: 10, alignItems: 'center' }}>
                                                {/* <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ ModalVisible: false })
                                                        if (this.state.selectedDate !== null) {
                                                            this.props.getHomeworkFromDate(userArr[0].class, userArr[0].school_name, this.state.selectedDate)
                                                        }
                                                    }}
                                                >
                                                    <Text style={{ color: 'lightgreen', fontSize: 25, fontWeight: 'bold' }}>Select</Text>
                                                </TouchableOpacity> */}
                                                <TouchableOpacity

                                                    onPress={() => this.setState({ ModalVisible: false })}
                                                >
                                                    <Text style={{ color: 'lightgreen', fontSize: 25, fontWeight: 'bold' }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                    </View>

                                </View>

                            </View>


                        </Modal>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    cards: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        width: screenWidth / 1.1,
        height: screenHeight / 1.9,
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding: 10,
        margin: 10,
        // flexDirection: 'row'

    },
    model: {
        backgroundColor: "#3498db",
        borderRadius: 20,
        paddingHorizontal: 10
    },
    modelText: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 10,
        color: 'white'
    },
    modelText2: {
        fontSize: 25,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        color: 'white'
    },
})

const mapStateTOProps = state => {
    // console.log(state)
    return {
        number: state.auth.mobileNumber,
        isLoading: state.auth.isLoading,
        userArr: state.auth.userArr,
        allStudents: state.auth.allStudents
    }
}
export default connect(mapStateTOProps, {
    getProfile,
    reset
})(Profile)