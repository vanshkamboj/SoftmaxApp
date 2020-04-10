
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
// let pushData = [
//     {
//       title: "First push",
//       message: "First push message"
//     },
//     {
//       title: "Second push",
//       message: "Second push message"
//     }
//   ]
//   _renderItem = ({ item }) => (
//     <View key={item.title}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.message}>{item.message}</Text>
//     </View>
//   );
const Softmax = () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
        <Provider store={store}>
            <Router />
            {/* <PushController /> */}
        </Provider>
    )
}

export default Softmax