/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import Reactotron from './app/services/reactotron';

if (__DEV__) {
  Reactotron.init().then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
