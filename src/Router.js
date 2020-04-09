import React from "react"
import { Scene, Router } from 'react-native-router-flux'
// import { Scene, Router } from 'react-router-flux'
import Signin from './screens/signIn'
import otp from './screens/otp'
import Home from "./screens/HomeScreen"
// import SignUp from './signUp'
import { StyleSheet, View, TouchableOpacity } from "react-native"
import OnlineVideo from './screens/OnlineVideos'
import E_learning from './screens/E_learning'
import Books from './screens/Books'
import BooksSubject from './screens/BooksSubject'
import OnlineTest from './screens/OnlineTest'
import ViewBook from './screens/ViewBook'
import HomeWork from './screens/HomeWork'
import DairyPics from './screens/DairyPics'
import ShowDairyPics from './screens/ShowDairyImage'
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
                    <Scene key="video" component={OnlineVideo}
                        hideNavBar={true}
                    />
                    <Scene key="E_learning" component={E_learning}
                        hideNavBar={true}
                    />
                    <Scene key="Books" component={Books}
                        hideNavBar={true}
                    />
                    <Scene key="test" component={OnlineTest}
                        hideNavBar={true}
                    />
                    <Scene key="BooksSubject" component={BooksSubject}
                        hideNavBar={true}
                    />
                    <Scene key="ViewBook" component={ViewBook}
                        hideNavBar={true}
                    />
                    <Scene key="homeWork" component={HomeWork}
                        hideNavBar={true}
                    />
                    <Scene key="dairy" component={DairyPics}
                        hideNavBar={true}
                    />
                    <Scene key="dairyPics" component={ShowDairyPics}
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