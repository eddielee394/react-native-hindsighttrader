import { combineReducers } from 'redux';
import message from './message.reducer';
import watchlists from '../../components/Watchlist/store/reducers/watchlists.reducer';
import watchlist from '../../components/Watchlist/store/reducers/watchlist.reducer';
import stock from '../../components/Stock/store/reducers';
import search from '../../components/Search/store/reducers';

const createReducer = asyncReducers =>
  combineReducers({
    message,
    watchlists,
    watchlist,
    stock,
    search,
    ...asyncReducers,
  });

export default createReducer;
