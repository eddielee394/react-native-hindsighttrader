import Tron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DEFAULT_REACTOTRON_CONFIG} from './reactotronConfig';

class Reactotron {
  static async setup() {
    Tron.setAsyncStorageHandler(AsyncStorage)
      .configure({
        ...DEFAULT_REACTOTRON_CONFIG,
      })
      .useReactNative({
        asyncStorage: false, // there are more options to the async storage.
        networking: {
          // optionally, you can turn it off with false.
          ignoreUrls: /symbolicate/,
        },
        editor: true, // there are more options to editor
        errors: {veto: stackFrame => false}, // or turn it off with false
        overlay: false, // just turning off overlay
      })
      .connect();
  }
}

export default Reactotron;
