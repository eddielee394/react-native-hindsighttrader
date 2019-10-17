import * as Actions from '../actions';

const initialState = {
  data: {},
  timerId: null,
  isLoading: false,
  error: null,
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_QUOTE:
      return { ...state, isLoading: true };

    case Actions.GET_QUOTE_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };

    case Actions.GET_QUOTE_ERROR:
      return { ...state, isLoading: true, error: action.payload };

    case Actions.SET_QUOTE_TIMER_ID:
      return { ...state, timerId: action.payload };

    default:
      return state;
  }
};

export default quoteReducer;
