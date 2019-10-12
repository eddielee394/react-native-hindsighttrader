import * as Actions from '../actions';

const initialState = '';

const symbolReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_SYMBOL:
      return action.payload;
    default:
      return state;
  }
};

export default symbolReducer;
