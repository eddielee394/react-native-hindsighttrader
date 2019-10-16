import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
  data: [
    {
      id: '0eccacea-805f-49a9-9338-f835935e4ac0',
      name: 'My First List',
      symbols: ['aapl', 'msft', 'goog'],
    },
    {
      id: 'ed0d22dc-7f32-4b71-9cf8-d46310728aaa',
      name: 'My Second List',
      symbols: ['tsla', 'amzn', 'nflx'],
    },
  ],
};

const watchlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_WATCHLISTS:
      return { ...state, data: action.payload };
    case Actions.CREATE_WATCHLIST:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case Actions.DELETE_WATCHLIST:
      return { ...state, data: _.reject(state.data, { id: action.payload }) };
    default:
      return state;
  }
};

export default watchlistsReducer;
