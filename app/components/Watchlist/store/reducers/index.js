import { combineReducers } from 'redux';
import watchlist from './watchlist.reducer';
import watchlists from './watchlists.reducer';

const reducer = combineReducers({
  data: watchlist,
  watchlists,
});

export default reducer;
