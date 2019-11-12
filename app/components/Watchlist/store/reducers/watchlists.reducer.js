import * as Actions from '../actions';
import { keyBy, reject, map } from 'lodash';

const initialState = [
  {
    id: '0eccacea-805f-49a9-9338-f835935e4ac0',
    name: 'My First List',
    symbols: ['AAPL', 'MSFT', 'GOOG'],
  },
  {
    id: 'ed0d22dc-7f32-4b71-9cf8-d46310728aaa',
    name: 'My Second List',
    symbols: ['TSLA', 'AMZN', 'NFLX'],
  },
];

const watchlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_WATCHLISTS:
      return [...state, ...action.payload];
    
    case Actions.CREATE_WATCHLIST:
      return [...state, action.payload];
    
    case Actions.DELETE_WATCHLIST:
      return [...reject(state, { id: action.payload })];
    
    case Actions.DELETE_WATCHLIST_SYMBOL:
      let watchlists = keyBy(state, 'id');
      
      let symbols = watchlists[action.id].symbols.filter(
          symbol => symbol !== action.symbol,
      );
      
      watchlists = {
        ...watchlists,
        [action.id]: {
          ...watchlists[action.id],
          symbols: symbols,
        },
      };
      
      let updatedWatchlists = map(watchlists);
      
      return updatedWatchlists;
    
    case Actions.ADD_WATCHLIST_SYMBOL:
      let _watchlists = keyBy(state, 'id');
      
      const index = _watchlists[action.watchlistId].symbols.findIndex(
          symbol => symbol === action.symbol,
      );
      
      _watchlists =
          index !== -1
              ? {
                ..._watchlists,
                [action.watchlistId]: {
                  ..._watchlists[action.watchlistId],
                  symbols: [
                    ..._watchlists[action.watchlistId].symbols.slice(0, index),
                    ..._watchlists[action.watchlistId].symbols.slice(index, +1),
                  ],
                },
              }
              : {
                ..._watchlists,
                [action.watchlistId]: {
                  ..._watchlists[action.watchlistId],
                  symbols: [
                    ..._watchlists[action.watchlistId].symbols,
                    action.symbol,
                  ],
                },
              };
      
      const _updatedWatchlists = map(_watchlists);
      
      return _updatedWatchlists;
    
    default:
      return state;
  }
};

export default watchlistsReducer;
