import { combineReducers } from 'redux';
import symbol from './symbol.reducer';
import message from './message.reducer';

const createReducer = asyncReducers =>
  combineReducers({
    message,
    symbol,
    ...asyncReducers,
  });

export default createReducer;
