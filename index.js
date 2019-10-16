import './app/config/reactotronConfig';
import { AppRegistry, YellowBox } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
