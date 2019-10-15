import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxPromise } from './reduxPromise';

export default applyMiddleware(reduxPromise, thunk);
