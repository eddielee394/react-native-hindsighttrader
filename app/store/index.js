import { compose, createStore } from 'redux';
import * as reduxModule from 'redux';
import { default as applyMiddleware } from '../middleware';
import createReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from '../config/reactotronConfig';

// noinspection JSUnresolvedVariable
/**
 * Fix for Firefox redux dev tools extension
 * https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 * @type {string}
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

// noinspection JSUnresolvedVariable
/**
 * Root Enhancer
 *
 */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: true,
        trace: true,
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware, Reactotron.createEnhancer());

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  blacklist: ['search', 'message', 'stock'],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, createReducer());
let store = createStore(persistedReducer, enhancer);

store.asyncReducers = {};
let persistor = persistStore(store);

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

persistor.persist();

export { store, persistor };
