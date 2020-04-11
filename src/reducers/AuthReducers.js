import {
    MOBILE_NUMBER_CHANGED,
    OTP_CHANGED,
    LOADING,
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
    GET_LATEST_HOMEWORK,
    ABSENT_DATE,
    ABSENT_DATE_COUNT,
    GET_MARKS,
    GET_GALLARY,
    Password_CHANGED,
    GET_ALL_STUDENTS,
    RESET
} from '../actions/types'
const INITIAL_STATE = {
    mobileNumber: null,
    isLoading: false,
    otp: null,
    confirmResult: null,
    userArr: null,
    books: null,
    booksCount: 0,
    booksSubject: null,
    booksSubjectCount: 0,
    notice: null,
    schoolLogoUrl: "https://softmax.info/images/school_logo_app.jpg",
    dairyPics: null,
    dairyPicsCount: 0,
    homework: null,
    absent: null,
    absentCount: 0,
    marks: null,
    gallary: null,
    password: null,
    allStudents: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOBILE_NUMBER_CHANGED:
            return { ...state, mobileNumber: action.payload }
        case Password_CHANGED:
            return { ...state, password: action.payload }
        case OTP_CHANGED:
            return { ...state, otp: action.payload }
        case LOADING:
            return { ...state, isLoading: action.payload }
        case CONFIRM_MOBILE:
            return { ...state, confirmResult: action.payload }
        case GET_USER_DATA:
            return { ...state, userArr: action.payload }
        case GET_BOOKS:
            return { ...state, books: action.payload }
        case BOOKS_COUNT:
            return { ...state, booksCount: action.payload }
        case BOOKS_SUBJECT:
            return { ...state, booksSubject: action.payload }
        case BOOKS_SUBJECT_COUNT:
            return { ...state, booksSubjectCount: action.payload }
        case NOTICE_CHANGED:
            return { ...state, notice: action.payload }
        case GET_SCHOOL_LOGO:
            return { ...state, schoolLogoUrl: action.payload }
        case GET_DAIRY_PIC:
            return { ...state, dairyPics: action.payload }
        case DAIRT_PICS_COUNT:
            return { ...state, dairyPicsCount: action.payload }
        case GET_LATEST_HOMEWORK:
            return { ...state, homework: action.payload }
        case ABSENT_DATE:
            return { ...state, absent: action.payload }
        case ABSENT_DATE_COUNT:
            return { ...state, absentCount: action.payload }
        case GET_MARKS:
            return { ...state, marks: action.payload }
        case GET_GALLARY:
            return { ...state, gallary: action.payload }
        case GET_ALL_STUDENTS:
            return { ...state, allStudents: action.payload }
        case RESET:
            return { ...state, schoolLogoUrl: "https://softmax.info/images/school_logo_app.jpg" }
        default:
            return state
    }
}