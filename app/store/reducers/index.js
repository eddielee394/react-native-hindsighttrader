import { combineReducers } from 'redux';
import symbol from './symbol.reducer';
import message from './message.reducer';
import watchlists from '../../components/Watchlist/store/reducers/watchlists.reducer';
import watchlist from '../../components/Watchlist/store/reducers/watchlist.reducer';

const createReducer = asyncReducers =>
  combineReducers({
    message,
    symbol,
    watchlists,
    watchlist,
    ...asyncReducers,
  });

export default createReducer;
