import {create} from 'apisauce';
import {DEFAULT_API_CONFIG} from './apiConfig';

class Api {
  setup() {
    create({
      baseURL: DEFAULT_API_CONFIG.url,
      timeout: DEFAULT_API_CONFIG.url,
      headers: {
        Accept: 'application/json',
      },
    });
  }
  
  
}

export default Api;
