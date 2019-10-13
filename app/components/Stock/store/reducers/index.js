import { combineReducers } from 'redux';
import stock from './stock.reducer';
import quote from './quote.reducer';
import chart from './chart.reducer';

const reducer = combineReducers({
  quote,
  chart,
  data: stock,
});

export default reducer;
