import * as Actions from '../actions';

const initialState = {
  data: {},
  isLoading: false,
};

const chartReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case Actions.GET_CHART:
      console.log('Actions.GET_CHART', action.payload);
      return { ...state, chart: action.payload };
    case Actions.GET_CHART:
      return { ...state, chart: action.payload };
    default:
      return state;
  }
};

export default chartReducer;
