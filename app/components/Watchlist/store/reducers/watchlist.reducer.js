import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
  data: {},
  id: '0eccacea-805f-49a9-9338-f835935e4ac0',
  name: 'My First List',
  symbols: ['AAPL', 'MSFT', 'GOOG'],
  isLoading: false,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_WATCHLIST:
      return { ...state, ...action.payload };

    case Actions.DELETE_WATCHLIST_SYMBOL:
      let filteredSymbols = [];
      filteredSymbols = state.symbols.filter(
        symbol => symbol !== action.symbol,
      );

      const filteredData = _.omit(state.data, action.symbol);

      return {
        ...state,
        symbols: filteredSymbols,
        data: filteredData,
      };

    case Actions.GET_WATCHLIST_DATA:
      return { ...state, isLoading: true };

    case Actions.GET_WATCHLIST_DATA_SUCCESS:
      return { ...state, data: { ...state.data, ...action.payload } };

    case Actions.ADD_WATCHLIST_SYMBOL:
      return { ...state, symbols: [...state.symbols, action.symbol] };

    case Actions.TOGGLE_WATCHLIST:
      return {
        ...state,
        ...action.payload,
        data: { ...action.payload.data },
      };

    default:
      return state;
  }
};

export default watchlistReducer;
