import Api from '../../../../services/api';
import { showMessage } from '../../../../store/actions';
import * as Actions from './index';

export const GET_QUOTE = '[STOCKS ] GET QUOTE';
export const GET_QUOTE_SUCCESS = '[STOCKS ] GET QUOTE SUCCESS';
export const GET_QUOTE_ERROR = '[STOCKS ] GET QUOTE ERROR';
export const SET_QUOTE_TIMER_ID = '[STOCKS ] SET QUOTE TIMER ID';
export const CLEAR_QUOTE_TIMER_ID = '[STOCKS ] CLEAR QUOTE TIMER ID';

export function getQuote(symbol) {
  const request = Api.getQuoteData(symbol);

  return dispatch => {
    dispatch({
      type: GET_QUOTE,
    });

    request
      .then(response => {
        dispatch(Actions.setLastUpdated());

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

export function pollQuote(symbol, timeout) {
  return dispatch => {
    const timerId = setInterval(() => {
      dispatch(getQuote(symbol));
      dispatch(Actions.setQuoteTimerId(timerId));
    }, timeout);
  };
}

export function setQuoteTimerId(timerId) {
  return dispatch =>
    dispatch({
      type: SET_QUOTE_TIMER_ID,
      payload: timerId,
    });
}

export function clearQuoteTimer(timerId) {
  clearInterval(timerId);

  return dispatch =>
    dispatch({
      type: CLEAR_QUOTE_TIMER_ID,
    });
}
