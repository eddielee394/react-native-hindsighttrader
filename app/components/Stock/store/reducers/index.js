import { combineReducers } from 'redux';
import stock from './stock.reducer';
import quote from './quote.reducer';
import chart from './chart.reducer';
import news from './news.reducer';

const reducer = combineReducers({
  quote,
  chart,
  news,
  data: stock,
});

export default reducer;
