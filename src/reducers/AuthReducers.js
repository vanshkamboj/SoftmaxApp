import {
    MOBILE_NUMBER_CHANGED,
    OTP_CHANGED,
    LOADING,
    CONFIRM_MOBILE,
    GET_USER_DATA,
    GET_BOOKS,
    BOOKS_COUNT,
    BOOKS_SUBJECT,
    BOOKS_SUBJECT_COUNT
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
    booksSubjectCount: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOBILE_NUMBER_CHANGED:
            return { ...state, mobileNumber: action.payload }
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
        default:
            return state
    }

}