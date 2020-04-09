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
    BOOKS_SUBJECT_COUNT,
    NOTICE_CHANGED,
    GET_SCHOOL_LOGO,
    GET_DAIRY_PIC,
    DAIRT_PICS_COUNT,
    GET_LATEST_HOMEWORK
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
        fetch("https://softmax.info/getprofile2.php?id=" + 514 + "&mobile=" + 7017165652)
            .then((response) => response.json())
            .then((userInfo) => {
                // return (dispatch) => {
                // console.log(userInfo)
                dispatch({ type: GET_USER_DATA, payload: userInfo })
                dispatch({ type: LOADING, payload: false })
                // getNotice("Demo Public School")
                // }
                fetch("https://softmax.info/getnotice.php?school=" + userInfo[0].school_name)
                    .then((response) => response.json())
                    .then((notice) => {
                        // return (dispatch) => {
                        // alert(notice)
                        // console.log(notice[0].notice)
                        dispatch({ type: NOTICE_CHANGED, payload: notice[0].notice })
                        // dispatch({ type: LOADING, payload: false })
                        // }
                        let school_name = userInfo[0].school_name.replace(/ /g, "%20")

                        // fetch("https://softmax.info/images/" + school_name + "/logo.png")
                        fetch("https://softmax.info/images/" + school_name + "/logo.png")
                            // .then((response) => response.json())
                            .then((url) => {
                                // console.log(url.ok)
                                if (url.ok == true)
                                    dispatch({ type: GET_SCHOOL_LOGO, payload: "https://softmax.info/images/" + school_name + "/logo.png" })
                                // alert(school_name)
                                // dispatch({ type: LOADING, payload: false })

                            })
                            .catch((error) => {
                                console.error(error);
                                alert(error)
                            });

                        // dispatch({ type: GET_SCHOOL_LOGO, payload: "https://softmax.info/images/" + school_name + "/logo.png" })
                        // alert(school_name)
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error)
                    });
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

export const getDairyPics = (clas, school) => {
    let school_name = school.replace(/ /g, "%20")
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        fetch("https://softmax.info/get_markspic.php?school=" + school_name + "&class=" + clas)
            .then((response) => response.json())
            .then((pics) => {
                // return (dispatch) => {
                // console.log(pics)
                dispatch({ type: GET_DAIRY_PIC, payload: pics })
                let key, count = 0
                for (key in pics) {
                    if (pics.hasOwnProperty(key)) {
                        count++
                    }
                }
                dispatch({ type: DAIRT_PICS_COUNT, payload: count })
                // dispatch({ type: LOADING, payload: false })
                // }

                fetch("https://softmax.info/get_homework.php?school=" + school_name + "&class=" + clas)
                    .then((response) => response.json())
                    .then((homework) => {
                        // return (dispatch) => {
                        // console.log(homework)
                        dispatch({ type: GET_LATEST_HOMEWORK, payload: homework[0].homework })
                        // let key, count = 0
                        // for (key in pics) {
                        //     if (pics.hasOwnProperty(key)) {
                        //         count++
                        //     }
                        // }
                        // dispatch({ type: DAIRT_PICS_COUNT, payload: count })
                        dispatch({ type: LOADING, payload: false })
                        // }
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error)
                    });
            })
            .catch((error) => {
                console.error(error);
                alert(error)
            });
    }
}
export const getHomeworkFromDate = (clas, medium, subject) => {
    let school_name = school.replace(/ /g, "%20")
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

// String urladdress = "https://softmax.info/gethomework.php?date="+date+"&clg="+school+"&class="+clas;

// String urladdress = "https://softmax.info/get_homework.php?school=" + school + "&class=" + clas;