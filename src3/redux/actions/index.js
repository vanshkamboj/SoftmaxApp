import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOADING,
    SIGNUP_USER_SUCCESS,
    NAME_CHANGED,
    NUMBER_CHANGED,
    LOGIN_USER_FAIL,
    GETNOTES,
    MODELSHOW,
    TITLE_CHANGED,
    NOTE_CHANGE,
    COLOR_MODEL_SHOW,
    SELECT_TEXT_COLOR
} from "./types"
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'
import { loginSuccess } from "../actions/navigationScreens"

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}
export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    }
}
export const numberChanged = (text) => {
    return {
        type: NUMBER_CHANGED,
        payload: text
    }
}
export const signOut = () => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
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


export const logInUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
                // dispatch({ type: 'success' })
                Actions.main()
            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }


}
export const signUpUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            // .then(() => this.props.navigation.navigate('Home'))
            .then((user) => {
                dispatch({ type: SIGNUP_USER_SUCCESS, payload: user })
                // alert("sucsess")

            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }
}

export const getNotes = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
        const { Notes, isLikes, notesHeading, notesdate, image, textColor } = res.data();
        userArr.push({
            key: res.id,
            res,
            Notes,
            isLikes,
            notesHeading,
            notesdate,
            image,
            textColor
        })
        // console.log(userArr)
    })
    return {
        type: GETNOTES,
        payload: userArr
    }

}

export const countOfNotes = (userArr) => {
    return (dispatch) => {
        let key, count = 0
        for (key in userArr) {
            if (userArr.hasOwnProperty(key)) {
                count++
            }
        }
        dispatch({ type: 'count', payload: count })
    }
}

export const modalShow = (task) => {
    return {
        type: MODELSHOW,
        payload: task
    }
}
export const colorModalShow = (task) => {
    return {
        type: COLOR_MODEL_SHOW,
        payload: task
    }
}

export const onTitleChanged = (title) => {
    return {
        type: TITLE_CHANGED,
        payload: title
    }
}

export const onNoteChanged = (note) => {
    return {
        type: NOTE_CHANGE,
        payload: note
    }
}

export const addNewNote = (title, note, color) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc();
        updateDBRef.set({
            Notes: note,
            // isLikes: this.state.islike,
            notesHeading: title,
            notesdate: new Date().getTime(),
            textColor: color,
            image: '',
            Complete: false
            // img: this.state.images
        })
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                Actions.notes()
            })

            .catch((error) => {
                alert(error)
            });
    }
}

export const deleteNote = (key) => {
    return (dispatch) => {
        // dispatch({ type: LOADING, payload: true })
        const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(key)
        dbRef.delete().then(() => {
            // dispatch({ type: LOADING, payload: false })
            console.log('Item removed from database')
        })
    }
}
export const textColorChanged = (color) => {
    return {
        type: SELECT_TEXT_COLOR,
        payload: color
    }

}
export const addNewNoteWithImage = (title, imageUrl, color) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc();
        updateDBRef.set({
            image: imageUrl,
            // isLikes: this.state.islike,
            notesHeading: title,
            notesdate: new Date().getTime(),
            textColor: color
            // img: this.state.images
        })
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                Actions.notes()
            })

            .catch((error) => {
                alert(error)
            });
    }
}
// export async function addNewNoteWithImage(title, imageUrl, color) {
//     try {
//         await firebase.firestore().collection(firebase.auth().currentUser.uid).doc().set({
//             image: imageUrl,
//             // isLikes: this.state.islike,
//             notesHeading: title,
//             notesdate: new Date().getTime(),
//             textColor: color
//             // img: this.state.images
//         })
//         return (dispatch) => {
//             dispatch({ type: LOADING, payload: false })
//             Actions.notes()
//         }
//         // alert("Logout")
//     } catch (error) {
//         // console.log(e);
//         // this.setState({ error: e })
//         alert(error)
//     }

// }

export const loading = (task) => {
    return {
        type: 'loadingShow',
        payload: task
    }
}
