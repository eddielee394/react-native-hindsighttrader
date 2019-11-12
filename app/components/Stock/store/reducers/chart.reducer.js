import * as Actions from '../actions';

const initialState = {
  data: {},
  range: Actions.RANGE.oneMonth.range,
  interval: 1,
  isLoading: true,
  error: null,
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {

    case Actions.GET_CHART:
      return { ...state, isLoading: true };

    case Actions.GET_CHART_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };

    case Actions.GET_CHART_ERROR:
      return { ...state, isLoading: true, error: action.payload };

    case Actions.TOGGLE_RANGE:
      return { ...state, range: action.range, isLoading:true };

    default:
      return state;
  }
};

export default chartReducer;
