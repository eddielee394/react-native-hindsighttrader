import {APP_CONFIG} from '../../config';

/**
 * Default API configuration
 * @type {{url: *, timeout: number}}
 */
export const DEFAULT_API_CONFIG = {
  url: APP_CONFIG.apiUrl,
  timeout: 10000,
};
