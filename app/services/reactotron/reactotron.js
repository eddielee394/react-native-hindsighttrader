import Tron, {
  networking,
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DEFAULT_REACTOTRON_CONFIG } from './reactotronConfig';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import Immutable from 'seamless-immutable';
import apisaucePlugin from 'reactotron-apisauce';
// import { persistor } from '../../store';

class Reactotron {
  config = DEFAULT_REACTOTRON_CONFIG;
  createEnhancer = () => Tron.createEnhancer();

  /**
   * Initializes reactotron instance
   * @return {Promise<Reactotron<ReactotronSubtype> & ReactotronSubtype>}
   */
  async init() {
    // only run this in dev... metro bundler will ignore this block: 🎉
    if (__DEV__) {
      // configure reactotron
      Tron.configure({
        name: this.config.name,
        host: this.config.host,
      });

      // hookup middleware
      if (this.config.useAsyncStorage) {
        Tron.setAsyncStorageHandler(AsyncStorage);
      }
      Tron.useReactNative();
      Tron.use(networking());
      Tron.use(openInEditor());
      Tron.use(
        trackGlobalErrors({
          veto: frame =>
            frame.fileName.indexOf('/node_modules/react-native/') >= 0,
        }),
      );
      Tron.use(
        apisaucePlugin({
          ignoreContentTypes: /^(image)\/.*$/i, // <--- a way to skip printing the body of some requests (default is any image)
        }),
      );

      // hookup redux middleware
      Tron.use(reduxPlugin());

      // connect to the app
      Tron.connect();

      // Register Custom Commands
      // Tron.onCustomCommand({
      //   title: 'Reset Root Store',
      //   description: 'Resets the MST store',
      //   command: 'resetStore',
      //   handler: () => {
      //     console.tron.log('resetting store');
      //     clear();
      //   },
      // });

      Tron.onCustomCommand({
        title: 'Purge persisted storage',
        description: 'Purges the persisted storage',
        command: 'persistorPurge',
        handler: () => {
          console.tron.log('purging the persisted storage');
          // persistor.purge();
        },
      });

      // clear if we should
      if (this.config.clearOnLoad) {
        Tron.clear();
      }
    }
  }
}

const instance = new Reactotron();

export default instance;
