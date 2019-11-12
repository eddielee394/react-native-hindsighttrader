import * as Actions from '../actions';
import { has, omit } from 'lodash';

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

    case Actions.GET_WATCHLIST_DATA:
      return { ...state, isLoading: true };

    case Actions.GET_WATCHLIST_DATA_SUCCESS:
      return { ...state, data: { ...state.data, ...action.payload } };

    case Actions.ADD_WATCHLIST_SYMBOL:
      const index = state.symbols.findIndex(symbol => symbol === action.symbol);

      const data = has(state.data, action.symbol)
        ? omit(state.data, action.symbol)
        : state.data;

      return index !== -1
        ? {
            ...state,
            symbols: [
              ...state.symbols.slice(0, index),
              ...state.symbols.slice(index + 1),
            ],
            data: data,
          }
        : {
            ...state,
            symbols: [...state.symbols, action.symbol],
            data: data,
          };

    case Actions.DELETE_WATCHLIST_SYMBOL:
      let filteredSymbols = [];
      filteredSymbols = state.symbols.filter(
        symbol => symbol !== action.symbol,
      );

      const filteredData = omit(state.data, action.symbol);

      return {
        ...state,
        symbols: filteredSymbols,
        data: filteredData,
      };

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
