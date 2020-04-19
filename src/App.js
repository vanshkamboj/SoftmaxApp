
import React, { Component } from 'react'
// import App from '../../App'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
// import PushController from './components/PushController'
import reducers from './reducers'
import Router from "./Router"
import ReduxThunk from 'redux-thunk'
class Softmax extends Component {



    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return (
            <Provider store={store}>
                <Router />
                {/* <PushController /> */}
            </Provider>

        )
    }
}


export default Softmax