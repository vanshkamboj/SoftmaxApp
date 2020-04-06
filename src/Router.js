import React from "react"
import { Scene, Router } from 'react-native-router-flux'
// import { Scene, Router } from 'react-router-flux'
import Signin from './screens/signIn'
import otp from './screens/otp'
import Home from "./screens/HomeScreen"
// import SignUp from './signUp'
import { StyleSheet, View, TouchableOpacity } from "react-native"
// import NotesListShow from '../screens/NotesListShow'
// import addNote from '../screens/addNote'
// import addLocation from '../screens/addLocation'
// import addImage from '../screens/addImage'
// import Icon from 'react-native-vector-icons/Entypo';
// import Ionicons from 'react-native-vector-icons/Ionicons';


const RouerComponent = () => {
    return (
        <Router
            titleStyle={styles.titleStyle}
            sceneStyle={styles.sceneStyle}
            navigationBarStyle={styles.navBarStyle}
        >
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="Home" component={Home}
                        initial
                        // renderRightButton={InboxIcon}
                        hideNavBar={true}
                    />
                    <Scene key="login" component={Signin}
                        // initial
                        // renderRightButton={InboxIcon}
                        hideNavBar={true}
                    />
                    <Scene key="otp" component={otp}
                        hideNavBar={true}
                    />
                </Scene>
                {/* <Scene key='main'> */}
                {/* <Scene key='deshboard' component={Deshboard}
                        hideNavBar={true}

                        // title='Deshboard'
                        // rightTitle="add"
                        // onRight={() => console.log("kcnskkns")}
                        // renderRightButton={InboxIcon}
                        headerLayoutPreset={'center'}
                    />
                    <Scene key="notes" component={NotesListShow}
                        hideNavBar={true}
                    />
                    <Scene key="addNotes" component={addNote}
                        hideNavBar={true}
                    />
                    <Scene key="addImage" component={addImage}
                        hideNavBar={true}
                    />
                    <Scene key="addLocation" component={addLocation}
                        hideNavBar={true}
                    /> */}

                {/* </Scene> */}
            </Scene>
        </Router>

    )
}
const styles = StyleSheet.create({
    titleStyle: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
    }
})
const InboxIcon = () => {
    return (
        <View style={{ marginRight: 20 }} >
            <TouchableOpacity onPress={() => console.log("asaknknsa")} >
                <Icon
                    name='dots-three-vertical'
                    // type='Feather'
                    size={30}
                />
            </TouchableOpacity>
        </View>
    );
};
export default RouerComponent