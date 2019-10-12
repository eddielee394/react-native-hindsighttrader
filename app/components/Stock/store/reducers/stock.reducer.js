import * as Actions from '../actions';

const initialState = {
  data: {},
  lastUpdated: null,
  isLoading: false,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_LAST_UPDATED:
      return { ...state, lastUpdated: action.payload };
    default:
      return state;
  }
};

export default stockReducer;
