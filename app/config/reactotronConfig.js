import { APP_CONFIG } from './index';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import apisaucePlugin from 'reactotron-apisauce';
import { persistor } from '../store';

console.disableYellowBox = true;

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    clearOnLoad: true,
    name: APP_CONFIG.name,
    host: APP_CONFIG.host,
    useAsyncStorage: true,
    state: {
      initial: true,
      snapshots: true,
    },
  })
  .useReactNative({
    asyncStorage: { ignore: ['secret'] },
    networking: { ignoreUrls: /symbolicate/ },
  })
  .use(
    reduxPlugin({
      except: [
        '[STOCKS ] GET QUOTE SUCCESS',
        '[STOCKS ] SET_LAST_UPDATED',
        '[STOCKS ] GET QUOTE',
      ],
    }),
  )
  .use(
    apisaucePlugin({
      ignoreContentTypes: /^(image)\/.*$/i, // <--- a way to skip printing the body of some requests (default is any image)
    }),
  )
  .connect();

console.tron = reactotron;

export default reactotron;

//custom commands
reactotron.onCustomCommand({
  title: 'Purge persisted storage',
  description: 'Purges the persisted storage',
  command: 'persistorPurge',
  handler: () => {
    console.tron.log('purging the persisted storage');
    persistor.purge();
  },
});
