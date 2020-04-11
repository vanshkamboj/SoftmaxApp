import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
    StatusBar,
    Image
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import {
    getDairyPics,
    getHomeworkFromDate
} from "../actions"
import Loading from "../components/loading"
import DatePicker from 'react-native-date-picker'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ShowHomeWork extends Component {
    state = {
        date: new Date(),
        ModalVisible: false,
        selectedDate: null
    }
    componentDidMount() {

        let { userArr } = this.props
        // if (this.props.homework == null)
        this.props.getDairyPics(userArr[0].class, userArr[0].school_name)
    }
    getDate = (today) => {
        // var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '-' + dd + '-' + yyyy
        this.setState({ selectedDate: today })
        // alert(today)
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
                        <View style={{ backgroundColor: color }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                margin: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Home Work(Text)</Text>
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

                        </View>
                        <View style={{
                            flex: 2,
                            backgroundColor: '#e0ae16',
                            alignItems: 'center',
                            justifyContent: 'center',

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

                                        <TouchableOpacity
                                            onPress={() => this.setState({ ModalVisible: true })}
                                        >
                                            <Text style={{ fontWeight: 'bold' }}>Click here to Select Homework date</Text>

                                        </TouchableOpacity>
                                        {/* <Text style={{ fontWeight: 'bold' }}>Student's Information</Text> */}
                                    </View>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            marginTop: 10
                                        }}>{this.state.selectedDate}</Text>

                                        <Text style={{
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            marginTop: 10
                                        }}>{this.props.homework !== null ?
                                            this.props.homework !== undefined ?
                                                this.props.homework : "HomeWork Not Found"
                                            : "HomeWork Not Found"}</Text>


                                        {/* <DatePicker
                                            date={this.state.date}
                                            // onDateChange={(date) => this.setState({ date: date })}
                                            onDateChange={(date) => this.getDate(date)}
                                            mode={'date'}
                                        /> */}
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
                                        <View style={styles.model}>
                                            <Text style={styles.modelText}>Select Date</Text>
                                            <DatePicker
                                                style={{ width: screenWidth / 2, alignSelf: 'center' }}
                                                date={this.state.date}
                                                // onDateChange={(date) => this.setState({ date: date })}
                                                onDateChange={(date) => this.getDate(date)}
                                                mode={'date'}
                                            />
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 50, marginVertical: 10 }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ ModalVisible: false })
                                                        if (this.state.selectedDate !== null) {
                                                            this.props.getHomeworkFromDate(userArr[0].class, userArr[0].school_name, this.state.selectedDate)
                                                        }
                                                    }}
                                                >
                                                    <Text style={{ color: 'lightgreen', fontSize: 25, fontWeight: 'bold' }}>Select</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ position: 'absolute', right: 30 }}

                                                    onPress={() => this.setState({ ModalVisible: false })}
                                                >
                                                    <Text style={{ color: 'gray', fontSize: 25, fontWeight: 'bold' }}>Cancel</Text>
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
        height: screenHeight / 1.5,
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
        marginTop: 10,
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
        homework: state.auth.homework
    }
}
export default connect(mapStateTOProps, {
    getDairyPics,
    getHomeworkFromDate
})(ShowHomeWork)