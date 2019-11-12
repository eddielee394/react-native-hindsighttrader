import * as Actions from '../actions';

const initialState = {
  symbol: 'aapl',
  companyInfo: {},
  lastUpdated: null,
  isLoading: false,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
 
    case Actions.SET_LAST_UPDATED:
      return { ...state, lastUpdated: action.payload };
 
    case Actions.SET_SYMBOL:
      return { ...state, symbol: action.payload };

    case Actions.GET_COMPANY_INFO:
      return { ...state, isLoading: true };

    case Actions.GET_COMPANY_INFO_SUCCESS:
      return { ...state, companyInfo: action.payload, isLoading: false };

    default:
      return state;
  }
};

export default stockReducer;
