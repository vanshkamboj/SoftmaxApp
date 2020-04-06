
import React, { Component } from 'react'
// import App from '../../App'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import Router from "./Router"
import ReduxThunk from 'redux-thunk'
const Softmax = () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default Softmax