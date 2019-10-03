/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import Reactotron from './app/services/reactotron/reactron';

if (__DEV__) {
  Reactotron.setup().then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
