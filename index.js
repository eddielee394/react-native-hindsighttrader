import { AppRegistry, YellowBox } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import Reactotron from './app/services/reactotron';

//TODO-ep remove before final deployment
YellowBox.ignoreWarnings([
  'componentWillMount is deprecated',
  'componentWillReceiveProps is deprecated',
  'Remote debugger',
]);

if (__DEV__) {
  Reactotron.init().then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
