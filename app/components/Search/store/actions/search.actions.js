import Api from '../../../../services/api';
import { showMessage } from '../../../../store/actions';

export const GET_SYMBOLS = '[SEARCH] GET SYMBOLS';
export const GET_SYMBOLS_SUCCESS = '[SEARCH] GET SYMBOLS SUCCESS';
export const GET_SYMBOLS_ERROR = '[SEARCH] GET SYMBOLS ERROR';
export const GET_RESULTS = '[SEARCH] GET RESULTS';

export function getSymbols() {
  const request = Api.getSymbols();

  return dispatch => {
    dispatch({
      type: GET_SYMBOLS,
    });
    request
      .then(response => {
        return dispatch({
          type: GET_SYMBOLS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {

        dispatch({
          type: GET_SYMBOLS_ERROR,
          payload: error.message,
        });
        return dispatch(showMessage(error.message));
      });
  };
}

export function getResults(query) {
  return dispatch => {
    dispatch({
      type: GET_RESULTS,
      query,
    });
  };
}
