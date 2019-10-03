import {APP_CONFIG} from '../../config'

/**
 * The default Reactotron configuration.
 */
export const DEFAULT_REACTOTRON_CONFIG = {
  clearOnLoad: true,
  name: APP_CONFIG.name,
  host: APP_CONFIG.host,
  useAsyncStorage: true,
  state: {
    initial: true,
    snapshots: false,
  },
};
