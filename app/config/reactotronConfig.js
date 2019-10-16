import { APP_CONFIG } from './index';
import { AsyncStorage } from 'react-native';
import Reactotron, {
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import apisaucePlugin from 'reactotron-apisauce';

console.disableYellowBox = true;

// First, set some configuration settings on how to connect to the app
Reactotron.setAsyncStorageHandler(AsyncStorage);
Reactotron.configure({
  clearOnLoad: true,
  name: APP_CONFIG.name,
  host: APP_CONFIG.host,
  useAsyncStorage: true,
  state: {
    initial: true,
    snapshots: true,
  },
});

// add every built-in react native feature.  you also have the ability to pass
// an object as a parameter to configure each individual react-native plugin
// if you'd like.
Reactotron.useReactNative({
  asyncStorage: { ignore: ['secret'] },
  networking: { ignoreUrls: /symbolicate/ },
});

// add some more plugins for redux & redux-saga
Reactotron.use(reduxPlugin());

Reactotron.use(openInEditor());

Reactotron.use(
  apisaucePlugin({
    ignoreContentTypes: /^(image)\/.*$/i, // <--- a way to skip printing the body of some requests (default is any image)
  }),
);
// if we're running in DEV mode, then let's connect!
if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;

/**
 * The default Reactotron configuration.
 */
// export const DEFAULT_REACTOTRON_CONFIG = {
//   clearOnLoad: true,
//   name: APP_CONFIG.name,
//   host: APP_CONFIG.host,
//   useAsyncStorage: true,
//   state: {
//     initial: true,
//     snapshots: true,
//   },
// };
