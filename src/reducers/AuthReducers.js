import {
    MOBILE_NUMBER_CHANGED,
    OTP_CHANGED,
    LOADING,
    CONFIRM_MOBILE
} from '../actions/types'
const INITIAL_STATE = {
    mobileNumber: null,
    isLoading: false,
    otp: null,
    confirmResult: null
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
        default:
            return state
    }

}