import React, {Component} from 'react';
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
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {numberChanged, logInUser, passwordChanged} from '../actions';
import Loading from '../components/loading';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class signIn extends Component {
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('islogin');
      if (value !== null) {
        if (value == 'true') Actions.Home();
      }
    } catch (e) {
      // error reading value
    }
  };

  loginAction = async (number, pass) => {
    const res = await this.props.logInUser(number, pass);
    console.log({res});
    if (res) this.props.navigation.navigate('Home');
  };
  componentDidMount() {
    changeNavigationBarColor('#2a017d');
    this.getData();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    Alert.alert(
      'Exit',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
        {
          text: 'No',
          onPress: () => console.log('User not exit'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
    return true;
  };
  render() {
    let color = '#2a017d';
    // changeNavigationBarColor(color)
    // hideNavigationBar()
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          style={{flex: 1, backgroundColor: color, paddingHorizontal: 30}}>
          <View style={{height: screenHeight, justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: color,
                alignItems: 'center',
                // justifyContent: 'center',
                paddingHorizontal: 25,
              }}>
              <StatusBar backgroundColor={color} barStyle="light-content" />
              <Image
                source={require('../images/logo.jpg')}
                style={{
                  height: 200,
                  width: 200,
                  margin: 10,
                }}
              />
              <Text
                style={{
                  // fontSize: 18,
                  color: '#e0ae16',
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                Your Online School App
              </Text>
            </View>
            <View>
              <Text style={{color: 'white', fontSize: 18}}>MOBILE NO.</Text>
              <TextInput
                style={[
                  {
                    width: screenWidth / 1.2,
                    backgroundColor: '#757eeb',
                    height: 55,
                    paddingHorizontal: 30,
                    marginTop: 10,
                    color: 'white',
                  },
                  styles.radiusBorder,
                ]}
                keyboardType="number-pad"
                value={this.props.number}
                onChangeText={number => this.props.numberChanged(number)}
              />
              <Text style={{color: 'white', fontSize: 18}}>PASSWORD</Text>
              <TextInput
                style={[
                  {
                    width: screenWidth / 1.2,
                    backgroundColor: '#757eeb',
                    height: 55,
                    paddingHorizontal: 30,
                    marginTop: 10,
                    color: 'white',
                  },
                  styles.radiusBorder,
                ]}
                keyboardType="name-phone-pad"
                secureTextEntry={true}
                value={this.props.pass}
                onChangeText={password => this.props.passwordChanged(password)}
              />
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: '#e0ae16',
                    width: screenWidth / 1.2,
                    marginTop: 10,
                    height: 55,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 30,
                  },
                  styles.radiusBorder,
                ]}
                onPress={async () => {
                  if (
                    this.props.number !== null &&
                    this.props.pass !== null &&
                    this.props.number.length == 10
                  )
                    // alert("done")
                    this.loginAction(this.props.number, this.props.pass);
                  // this.props.logInUser(this.props.number)
                }}>
                <Text style={{fontWeight: 'bold'}}>LOGIN</Text>
                <Image
                  source={require('../images/rightArrow.png')}
                  style={{
                    height: 20,
                    width: 20,
                    position: 'absolute',
                    right: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>{/* {this.props.isLoading ? <Loading /> : null} */}</View>
          </View>
          {this.props.isLoading && (
            <ActivityIndicator
              style={{
                position: 'absolute',
                top: screenHeight / 2,
                left: screenWidth / 2,
              }}
              size="large"
            />
          )}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  radiusBorder: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

const mapStateTOProps = state => {
  // console.log(state)
  return {
    number: state.auth.mobileNumber,
    isLoading: state.auth.isLoading,
    pass: state.auth.password,
  };
};
export default connect(
  mapStateTOProps,
  {
    numberChanged,
    logInUser,
    passwordChanged,
  },
)(signIn);
