import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
  data: {},
  id: '0eccacea-805f-49a9-9338-f835935e4ac0',
  name: 'Getting Started 1',
  symbols: ['aapl', 'msft', 'goog'],
  isLoading: false,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_WATCHLIST:
      return { ...state, ...action.payload };
    case Actions.DELETE_WATCHLIST_SYMBOL:
      let filteredSymbols = [];
      filteredSymbols = state.symbols.filter(symbol => {
        return symbol.toLowerCase() !== action.symbol.toLowerCase();
      });
      return {
        ...state,
        symbols: filteredSymbols,
      };

    case Actions.GET_WATCHLIST_DATA:
      return { ...state, isLoading: true };
    case Actions.GET_WATCHLIST_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default watchlistReducer;
