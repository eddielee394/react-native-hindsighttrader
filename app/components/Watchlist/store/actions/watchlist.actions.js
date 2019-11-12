import Api from '../../../../services/api';
import { find } from 'lodash';
import { showMessage } from '../../../../store/actions';

export const GET_WATCHLIST = '[WATCHLIST] GET WATCHLIST';
export const GET_WATCHLIST_DATA = '[WATCHLIST] GET WATCHLIST DATA';
export const GET_WATCHLIST_DATA_SUCCESS =
  '[WATCHLIST] GET WATCHLIST DATA SUCCESS';
export const GET_WATCHLIST_DATA_ERROR = '[WATCHLIST] GET WATCHLIST DATA ERROR';
export const DELETE_WATCHLIST_SYMBOL = '[WATCHLIST] DELETE WATCHLIST SYMBOL';
export const ADD_WATCHLIST_SYMBOL = '[WATCHLIST] ADD WATCHLIST SYMBOL';
export const TOGGLE_WATCHLIST = '[WATCHLISTS] TOGGLE WATCHLIST';

// export const ORDER_WATCHLIST = '[WATCHLIST] ORDER LIST';

export function getWatchlist(id) {
  return (dispatch, getState) => {
    const data = find(getState().watchlists, item => item.id === id);

    return dispatch({
      type: GET_WATCHLIST,
      payload: data,
    });
  };
}

export function getWatchlistData(symbols, types = null, options = null) {
  const request = Api.getMarketBatchData(symbols, types, options);

  return dispatch => {
    dispatch({
      type: GET_WATCHLIST_DATA,
    });

    request
      .then(response => {
        return dispatch({
          type: GET_WATCHLIST_DATA_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_WATCHLIST_DATA_ERROR,
          payload: error.message,
        });
        return dispatch(showMessage(error.message));
      });
  };
}

export function deleteWatchlistSymbol(symbol, id) {
  return dispatch => {
    return dispatch({
      type: DELETE_WATCHLIST_SYMBOL,
      id,
      symbol,
    });
  };
}

export function addWatchlistSymbol(symbol, id) {
  return (dispatch, getState) => {
    const watchlistId = id ? id : (id = getState().watchlist.id);

    return dispatch({
      type: ADD_WATCHLIST_SYMBOL,
      symbol,
      watchlistId,
    });
  };
}

export function toggleWatchlist(id) {
  return (dispatch, getState) => {
    const data = find(
      getState().watchlists,
      watchlist => watchlist.id === id,
    );

    return dispatch({
      type: TOGGLE_WATCHLIST,
      payload: data,
    });
  };
}
