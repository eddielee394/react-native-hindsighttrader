import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
  data: {
    id: '0eccacea-805f-49a9-9338-f835935e4ac0',
    name: 'Getting Started 1',
    symbols: ['aapl', 'msft', 'goog'],
  },
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_WATCHLIST:
      return { ...state, data: action.payload };
    case Actions.DELETE_WATCHLIST_SYMBOL:
      let filteredSymbols = [];
      filteredSymbols = state.data.symbols.filter(symbol => {
        return symbol.toLowerCase() !== action.symbol.toLowerCase();
      });
      return {
        ...state,
        data: {
          ...state.data,
          symbols: filteredSymbols,
        },
      };
    //
    // case Actions.UPDATE_WATCHLIST:
    //   return { ...state };
    // case Actions.REMOVE_WATCHLIST:
    //   return { ...state, data: [] };
    default:
      return state;
  }
};

export default watchlistReducer;
