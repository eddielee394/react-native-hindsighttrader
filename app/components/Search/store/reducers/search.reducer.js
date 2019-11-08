import * as Actions from '../actions';

const initialState = {
  symbols: [],
  results: [],
  isLoading: true,
  error: null,
};

const symbolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SYMBOLS:
      return { ...state, isLoading: true };

    case Actions.GET_SYMBOLS_SUCCESS:
      return { ...state, symbols: action.payload, isLoading: false };

    case Actions.GET_SYMBOLS_ERROR:
      return { ...state, isLoading: true, error: action.payload };

    case Actions.GET_RESULTS:
      let results;

      action.query === ''
        ? (results = [])
        : (results = state.symbols
            .filter(d =>
              d.symbol.toLowerCase().startsWith(action.query.toLowerCase()),
            )
            .slice(0, 20));

      return { ...state, results: results };

    default:
      return state;
  }
};

export default symbolsReducer;
