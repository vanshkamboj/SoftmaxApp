import {
    LOGIN_USER_SUCCESS,
    LOADING,
    MOBILE_NUMBER_CHANGED,
    LOGIN_USER_FAIL,
    MODELSHOW,
    OTP_CHANGED,
    CONFIRM_MOBILE,
    GET_USER_DATA,
    GET_BOOKS,
    BOOKS_COUNT,
    BOOKS_SUBJECT,
    BOOKS_SUBJECT_COUNT
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

export const getProfile = () => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        fetch("https://softmax.info/getprofile2.php?id=" + 13024 + "&mobile=" + 7017165652)
            .then((response) => response.json())
            .then((userInfo) => {
                // return (dispatch) => {
                // console.log(userInfo)
                dispatch({ type: GET_USER_DATA, payload: userInfo })
                dispatch({ type: LOADING, payload: false })
                // }
            })
            .catch((error) => {
                console.error(error);
                alert(error)
            });

    }
}
export const getBooks = (clas, medium) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        fetch("https://softmax.info/get_ebook_sub.php?medium=" + medium + "&class=" + clas)
            .then((response) => response.json())
            .then((Books) => {
                // return (dispatch) => {
                // console.log(Books)
                dispatch({ type: GET_BOOKS, payload: Books })
                let key, count = 0
                for (key in Books) {
                    if (Books.hasOwnProperty(key)) {
                        count++
                    }
                }
                dispatch({ type: BOOKS_COUNT, payload: count })
                dispatch({ type: LOADING, payload: false })
                // }
            })
            .catch((error) => {
                console.error(error);
                alert(error)
            });

    }
}


export const getBooksSubject = (clas, medium, subject) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        fetch("https://softmax.info/get_ebook.php?class_name=" + clas + "&medium=" + medium + "&subject=" + subject)
            .then((response) => response.json())
            .then((Books) => {
                // return (dispatch) => {
                // console.log(Books)
                dispatch({ type: BOOKS_SUBJECT, payload: Books })
                let key, count = 0
                for (key in Books) {
                    if (Books.hasOwnProperty(key)) {
                        count++
                    }
                }
                dispatch({ type: BOOKS_SUBJECT_COUNT, payload: count })
                dispatch({ type: LOADING, payload: false })
                // }
            })
            .catch((error) => {
                console.error(error);
                alert(error)
            });

    }
}

// String urladdress = "https://softmax.info/getprofile2.php?id="+value+"&mobile="+school_n;
// URL url = new URL("https://softmax.info/uploaded/"+school+"/Photos/"+rollnum+".jpg");

// webview.loadUrl("https://softmax.info/Schools/"+school+"/"+clas+".php");

// String urladdress = "https://softmax.info/get_ebook_sub.php?medium="+medium+"&class="+clas;

// String urladdress = "https://softmax.info/get_ebook.php?class_name="+value+"&medium="+medium+"&subject="+subject;