import Api from '../../../../services/api';
import { showMessage } from '../../../../store/actions';
import { setLastUpdated } from './stock.actions';
export const GET_QUOTE = '[STOCKS ] GET QUOTE';
export const GET_QUOTE_SUCCESS = '[STOCKS ] GET QUOTE SUCCESS';
export const GET_QUOTE_ERROR = '[STOCKS ] GET QUOTE ERROR';

export function getQuote(symbol) {
  const request = Api.getQuoteData(symbol);

  return dispatch => {
    dispatch({
      type: GET_QUOTE,
    });
    request
      .then(response => {
        dispatch(setLastUpdated());

        return dispatch({
          type: GET_QUOTE_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_QUOTE_ERROR,
        });
        dispatch(showMessage(error.message));
      });
  };
}
