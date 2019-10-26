import * as Actions from '../actions';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_NEWS_DATA:
      return { ...state, isLoading: true };

    case Actions.GET_NEWS_DATA_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };

    case Actions.GET_NEWS_DATA_ERROR:
      return { ...state, isLoading: true, error: action.payload };

    default:
      return state;
  }
};

export default newsReducer;
