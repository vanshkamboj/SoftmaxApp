import {
    LOGIN_USER_SUCCESS,
    LOADING,
    MOBILE_NUMBER_CHANGED,
    LOGIN_USER_FAIL,
    MODELSHOW,
    OTP_CHANGED,
    CONFIRM_MOBILE
} from "./types"
import firebase from 'react-native-firebase'
// import auth from '@react-native-firebase/auth'
import { Actions } from 'react-native-router-flux'
import { loginSuccess } from "../actions/navigationScreens"
// import { AccessToken, LoginManager } from 'react-native-fbsdk'
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
// import { GoogleSignin } from 'react-native-google-signin'



export const numberChanged = (number) => {
    return {
        type: MOBILE_NUMBER_CHANGED,
        payload: number
    }
}
export const otpChanged = (otp) => {
    return {
        type: OTP_CHANGED,
        payload: otp
    }
}
export const signOut = () => {
    return (dispatch) => {
        // dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                // dispatch({ type: 'success' })
                Actions.auth()
            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }
}
export const logInUser = (phoneNumber) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .signInWithPhoneNumber(`+91${phoneNumber}`)
            .then(confirmResult => {
                // this.setState({ confirmResult })
                dispatch({ type: LOADING, payload: false })
                dispatch({ type: CONFIRM_MOBILE, payload: confirmResult })
                // dispatch({ type: 'success' })
                Actions.otp()
                // console.log(confirmResult)
                // alert(confirmResult)
            })
            .catch(error => {
                dispatch({ type: LOADING, payload: false })
                alert(error.message)

                // console.log(error)
            })
    }

}

export const otpVerification = (confirmResult, verificationCode) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        confirmResult
            .confirm(verificationCode)
            .then(user => {
                // this.setState({ userId: user.uid })
                dispatch({ type: LOADING, payload: false })
                alert(`Verified! ${user.uid}`)
            })
            .catch(error => {
                dispatch({ type: LOADING, payload: false })
                alert(error.message)
                // console.log(error)
            })
    }
}

export const modalShow = (task) => {
    return {
        type: MODELSHOW,
        payload: task
    }
}
export const loading = (task) => {
    return {
        type: 'loadingShow',
        payload: task
    }
}