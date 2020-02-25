/**
 * @format
 */
// import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import mobile from './src/screens/Mobilenumber';
import HomeScreen from './src/screens/HomeScreen'

AppRegistry.registerComponent(appName, () => HomeScreen);
