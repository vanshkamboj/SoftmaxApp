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
  GET_Dairy_PIC,
  DAIRT_PICS_COUNT,
  GET_LATEST_HOMEWORK,
  ABSENT_DATE,
  ABSENT_DATE_COUNT,
  GET_MARKS,
  GET_GALLARY,
  Password_CHANGED,
  GET_ALL_STUDENTS,
  RESET,
  GET_STUDENT_PIC,
  LOADING2,
  GET_ZOOM_CLASS,
} from './types';
import firebase from 'react-native-firebase';
// import auth from '@react-native-firebase/auth'
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
// import { loginSuccess } from "../actions/navigationScreens"
// import { AccessToken, LoginManager } from 'react-native-fbsdk'
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
// import { GoogleSignin } from 'react-native-google-signin'

export const numberChanged = number => {
  return {
    type: MOBILE_NUMBER_CHANGED,
    payload: number,
  };
};
export const passwordChanged = pass => {
  return {
    type: Password_CHANGED,
    payload: pass,
  };
};
export const otpChanged = otp => {
  return {
    type: OTP_CHANGED,
    payload: otp,
  };
};
export const signOut = () => {
  return dispatch => {
    // dispatch({ type: LOADING, payload: true })
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({type: LOADING, payload: false});
        // dispatch({ type: 'success' })
        Actions.auth();
      })
      .catch(error => {
        alert(error);
        dispatch({type: LOGIN_USER_FAIL});
      });
  };
};
export const logInUser = (number, pass) => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/Lgin_react.php?password=' +
        pass +
        '&email=' +
        number,
    )
      .then(response => response.json())
      .then(status => {
        // console.log(status);
        if (status[0] == 'failure') {
          alert('please enter valid mobile number and password');
          dispatch({type: LOADING, payload: false});
          return;
        }

        // console.log(homework[0].homework);
        // dispatch({ type: GET_LATEST_HOMEWORK, payload: homework[0].homework })
        AsyncStorage.setItem('islogin', 'true');
        AsyncStorage.setItem('number', number);
        AsyncStorage.setItem('pass', pass);
        // dispatch({ type: GET_USER_DATA, payload: status })
        dispatch({type: LOADING, payload: false});
        Actions.Home();
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};
// export const logInUser = (phoneNumber) => {
//     return (dispatch) => {
//         dispatch({ type: LOADING, payload: true })
//         firebase
//             .auth()
//             .signInWithPhoneNumber(`+91${phoneNumber}`)
//             .then(confirmResult => {
//                 // this.setState({ confirmResult })
//                 console.log(confirmResult)
//                 dispatch({ type: LOADING, payload: false })
//                 dispatch({ type: CONFIRM_MOBILE, payload: confirmResult })
//                 // dispatch({ type: 'success' })
//                 Actions.otp()
//                 // console.log(confirmResult)
//                 // alert(confirmResult)
//             })
//             .catch(error => {
//                 dispatch({ type: LOADING, payload: false })
//                 alert(error.message)

//                 // console.log(error)
//             })
//     }

// }

export const otpVerification = (confirmResult, verificationCode) => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    confirmResult
      .confirm(verificationCode)
      .then(user => {
        // this.setState({ userId: user.uid })
        dispatch({type: LOADING, payload: false});
        alert(`Verified! ${user.uid}`);
      })
      .catch(error => {
        dispatch({type: LOADING, payload: false});
        alert(error.message);
        // console.log(error)
      });
  };
};

export const modalShow = task => {
  return {
    type: MODELSHOW,
    payload: task,
  };
};
export const loading = task => {
  return {
    type: 'loadingShow',
    payload: task,
  };
};

export const getProfile = (number, pass) => {
  // console.log(number, pass)
  return dispatch => {
    dispatch({type: LOADING2, payload: true});
    fetch(
      'https://softmax.info/getprofile2.php?id=' + pass + '&mobile=' + number,
    )
      .then(response => response.json())
      .then(userInfo => {
        // return (dispatch) => {
        // console.log(userInfo)
        dispatch({type: GET_USER_DATA, payload: userInfo});

        // getNotice("Demo Public School")
        // }
        fetch(
          'https://softmax.info/getnotice.php?school=' +
            userInfo[0].school_name,
        )
          .then(response => response.json())
          .then(notice => {
            // return (dispatch) => {
            // alert(notice)
            // console.log(notice[0].notice)
            dispatch({type: NOTICE_CHANGED, payload: notice[0].notice});
            // dispatch({ type: LOADING, payload: false })
            // dispatch({ type: LOADING, payload: false })
            // }
            let school_name = userInfo[0].school_name.replace(/ /g, '%20');
            // fetch("https://softmax.info/images/" + school_name + "/logo.png")

            fetch(
              'https://softmax.info/getprofile_spinner.php?mobile=' + number,
            )
              .then(response => response.json())
              .then(students => {
                dispatch({type: GET_ALL_STUDENTS, payload: students});
                // console.log(students);
                // console.log(students[0].length)
                // let key, count = 0
                // for (key in students) {
                //     if (students.hasOwnProperty(key)) {
                //         count++
                //     }
                // }
                // console.log(count)
                // console.log(homework[0].homework);
                // dispatch({ type: GET_LATEST_HOMEWORK, payload: homework[0].homework })

                dispatch({type: LOADING2, payload: false});

                fetch(
                  'https://softmax.info/images/' + school_name + '/logo.png',
                )
                  // .then((response) => response.json())
                  .then(url => {
                    // console.log(url.ok)
                    if (url.ok == true)
                      dispatch({
                        type: GET_SCHOOL_LOGO,
                        payload:
                          'https://softmax.info/images/' +
                          school_name +
                          '/logo.png',
                      });
                    // alert(school_name)
                    // dispatch({ type: LOADING, payload: false })
                    fetch(
                      'https://softmax.info/images/' +
                        userInfo[0].school_name +
                        '/' +
                        pass +
                        '.jpg',
                    )
                      // .then((response) => response.json())
                      .then(url => {
                        // console.log(url.ok)
                        if (url.ok == true) {
                          // alert("okay")
                          dispatch({
                            type: GET_STUDENT_PIC,
                            payload:
                              'https://softmax.info/images/' +
                              userInfo[0].school_name +
                              '/' +
                              pass +
                              '.jpg',
                          });
                        }
                        // alert(school_name)
                        // dispatch({ type: LOADING, payload: false })
                      })
                      .catch(error => {
                        // console.error(error);
                        alert(error);
                        dispatch({type: LOADING2, payload: false});
                      });
                  })
                  .catch(error => {
                    // console.error(error);
                    alert(error);
                    dispatch({type: LOADING2, payload: false});
                  });
              })
              .catch(error => {
                // console.error(error);
                alert(error);
                dispatch({type: LOADING2, payload: false});
              });

            // dispatch({ type: GET_SCHOOL_LOGO, payload: "https://softmax.info/images/" + school_name + "/logo.png" })
            // alert(school_name)
          })
          .catch(error => {
            // console.error(error);
            alert(error);
            dispatch({type: LOADING2, payload: false});
          });
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING2, payload: false});
      });
  };
};
export const getBooks = (clas, medium) => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/get_ebook_sub.php?medium=' +
        medium +
        '&class=' +
        clas,
    )
      .then(response => response.json())
      .then(Books => {
        if (Books[0] == 'failure') {
          // alert("please enter valid mobile number and password")
          dispatch({type: LOADING, payload: false});
          return;
        }
        // return (dispatch) => {
        // console.log(Books)
        dispatch({type: GET_BOOKS, payload: Books});
        let key,
          count = 0;
        for (key in Books) {
          if (Books.hasOwnProperty(key)) {
            count++;
          }
        }
        dispatch({type: BOOKS_COUNT, payload: count});
        dispatch({type: LOADING, payload: false});
        // }
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

export const getBooksSubject = (clas, medium, subject) => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/get_ebook.php?class_name=' +
        clas +
        '&medium=' +
        medium +
        '&subject=' +
        subject,
    )
      .then(response => response.json())
      .then(Books => {
        // return (dispatch) => {
        // console.log(Books)
        if (Books[0] == 'failure') {
          // alert("please enter valid mobile number and password")
          dispatch({type: LOADING, payload: false});
          return;
        }
        dispatch({type: BOOKS_SUBJECT, payload: Books});
        let key,
          count = 0;
        for (key in Books) {
          if (Books.hasOwnProperty(key)) {
            count++;
          }
        }
        dispatch({type: BOOKS_SUBJECT_COUNT, payload: count});
        dispatch({type: LOADING, payload: false});
        // }
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

export const getDairyPics = (clas, school) => {
  let school_name = school.replace(/ /g, '%20');
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/get_homework.php?school=' +
        school_name +
        '&class=' +
        clas,
    )
      .then(response => response.json())
      .then(homework => {
        dispatch({type: GET_LATEST_HOMEWORK, payload: homework[0].homework});

        dispatch({type: LOADING, payload: false});

        // })
        fetch(
          'https://softmax.info/get_markspic.php?school=' +
            school_name +
            '&class=' +
            clas,
        )
          .then(response => response.json())
          .then(pics => {
            if (pics[0] == 'failure') {
              // alert("please enter valid mobile number and password")
              dispatch({type: LOADING, payload: false});
              return;
            }

            dispatch({type: GET_Dairy_PIC, payload: pics});
            let key,
              count = 0;
            for (key in pics) {
              if (pics.hasOwnProperty(key)) {
                count++;
              }
            }
            dispatch({type: DAIRT_PICS_COUNT, payload: count});
          })
          // dispatch({ type: LOADING, payload: false })
          // }

          // fetch("https://softmax.info/get_homework.php?school=" + school_name + "&class=" + clas)
          //     .then((response) => response.json())
          //     .then((homework) => {

          //         dispatch({ type: GET_LATEST_HOMEWORK, payload: homework[0].homework })

          //         dispatch({ type: LOADING, payload: false })

          //     })
          .catch(error => {
            // console.error(error);
            alert(error);
            dispatch({type: LOADING, payload: false});
          });
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};
export const getHomeworkFromDate = (clas, school, date) => {
  let school_name = school.replace(/ /g, '%20');
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/gethomework.php?date=' +
        date +
        '&clg=' +
        school_name +
        '&class=' +
        clas,
    )
      .then(response => response.json())
      .then(homework => {
        // console.log(homework);
        // console.log(homework[0].homework);
        dispatch({type: GET_LATEST_HOMEWORK, payload: homework[0].homework});

        dispatch({type: LOADING, payload: false});
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

export const getAttendance = (rollNumber, school) => {
  let school_name = school.replace(/ /g, '%20');
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/getattendence.php?rollnum=' +
        rollNumber +
        '&school=' +
        school_name,
    )
      .then(response => response.json())
      .then(absent => {
        // return (dispatch) => {
        // console.log(absent)
        if (absent[0] == 'failure') {
          dispatch({type: LOADING, payload: false});
          return;
        }

        dispatch({type: ABSENT_DATE, payload: absent});
        let key,
          count = 0;
        for (key in absent) {
          if (absent.hasOwnProperty(key)) {
            count++;
          }
        }
        dispatch({type: ABSENT_DATE_COUNT, payload: count});
        dispatch({type: LOADING, payload: false});
        // }
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

export const getMarks = (school, rollnum) => {
  let school_name = school.replace(/ /g, '%20');
  console.log(rollnum);
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/get_marks.php?school=' +
        school_name +
        '&rollnum=' +
        rollnum,
    )
      .then(response => response.json())
      .then(marks => {
        // return (dispatch) => {
        // console.log(marks)
        if (marks[0] == 'failure') {
          dispatch({type: LOADING, payload: false});
          return;
        }
        dispatch({type: GET_MARKS, payload: marks});
        dispatch({type: LOADING, payload: false});
        // }
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

export const getGallaryData = school => {
  let school_name = school.replace(/ /g, '%20');
  // console.log(rollnum)
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch('https://softmax.info/get_gallary.php?school=' + school)
      .then(response => response.json())
      .then(gallary => {
        // return (dispatch) => {
        // console.log(gallary)
        if (gallary[0] == 'failure') {
          dispatch({type: LOADING, payload: false});
          return;
        }
        dispatch({type: GET_GALLARY, payload: gallary});
        dispatch({type: LOADING, payload: false});
        // }
      })
      .catch(error => {
        // console.error(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

// export const reset = async (number, id) => {

//     try {
//         // const value = await AsyncStorage.getItem('islogin')
//         await AsyncStorage.setItem('number', number)
//         await AsyncStorage.setItem('pass', id)
//         dispatch({ type: RESET, payload: true })
//         Actions.Home()
//     } catch (e) {
//         // error reading value
//         alert(e)
//     }
// }

export const reset = () => {
  return dispatch => {
    dispatch({type: RESET, payload: true});
    // Actions.Home()
  };
};

export const getZoomClass = (clas, school) => {
  let school_name = school.replace(/ /g, '%20');
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    fetch(
      'https://softmax.info/get_zoomClass.php?school=' +
        school_name +
        '&class=' +
        clas,
    )
      .then(response => response.json())
      .then(links => {
        // console.log(links)
        if (links[0] == 'failure') {
          // alert("please enter valid mobile number and password")
          dispatch({type: LOADING, payload: false});
          return;
        }
        // return (dispatch) => {
        // console.log(Books)
        dispatch({type: GET_ZOOM_CLASS, payload: links});
        // let key, count = 0
        // for (key in links) {
        //     if (links.hasOwnProperty(key)) {
        //         count++
        //     }
        // }
        // dispatch({ type: BOOKS_COUNT, payload: count })
        dispatch({type: LOADING, payload: false});
        // }
      })
      .catch(error => {
        // console.log(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

export const saveUserTime = (rollNumber, mobile, time) => {
  // let school_name = school.replace(/ /g, "%20")
  return dispatch => {
    // dispatch({ type: LOADING, payload: true })
    fetch(
      'https://softmax.info/saveUserLasteSeen.php?id=' +
        rollNumber +
        '&mobile=' +
        mobile +
        '&time=' +
        time,
    )
      .then(response => response.json())
      .then(links => {
        console.log(links);
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch({type: LOADING, payload: false});
      });
  };
};

// storeData = async () => {
//     try {
//         await AsyncStorage.setItem('@storage_Key', 'stored value')
//     } catch (e) {
//         // saving error
//     }
// }

// getData = async () => {
//     try {
//         const value = await AsyncStorage.getItem('@storage_Key')
//         if (value !== null) {
//             // value previously stored
//         }
//     } catch (e) {
//         // error reading value
//     }
// }
// cd android &&./gradlew clean
// ./gradlew assembleRelease
// sudo react-native bundle --platform android --dev false --entry-file index.js  --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/
