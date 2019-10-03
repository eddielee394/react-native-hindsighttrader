import {HOST, API_URL, APP_NAME} from 'react-native-dotenv';

/**
 * Default App Configuration
 * @type {{apiUrl: (*|string), name: *, host: (*|string)}}
 */
export const APP_CONFIG = {
  name: APP_NAME || 'React Native App',
  host: HOST || 'localhost',
  apiUrl: API_URL || 'http://localhost/api',
};
