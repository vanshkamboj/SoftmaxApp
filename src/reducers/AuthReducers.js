import {
    MOBILE_NUMBER_CHANGED,
    OTP_CHANGED,
    LOADING,
} from '../actions/types'
const INITIAL_STATE = {
    mobileNumber: null,
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOBILE_NUMBER_CHANGED:
            return { ...state, mobileNumber: action.payload }
        case OTP_CHANGED:
            return { ...state, pass: action.payload }
        case LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state
    }

}