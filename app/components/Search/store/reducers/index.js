import { combineReducers } from 'redux';
import search from './search.reducer';

const reducer = combineReducers({
  data: search,
});

export default reducer;
