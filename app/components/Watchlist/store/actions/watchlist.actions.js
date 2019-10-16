import Api from '../../../../services/api';

export const GET_WATCHLIST = '[WATCHLIST] GET WATCHLIST';
export const GET_WATCHLIST_DATA = '[WATCHLIST] GET WATCHLIST DATA';
export const GET_WATCHLIST_DATA_SUCCESS =
  '[WATCHLIST] GET WATCHLIST DATA SUCCESS';
export const GET_WATCHLIST_DATA_ERROR = '[WATCHLIST] GET WATCHLIST DATA ERROR';
export const DELETE_WATCHLIST_SYMBOL = '[WATCHLIST] DELETE WATCHLIST SYMBOL';
export const COPY_WATCHLIST = '[WATCHLIST] COPY WATCHLIST';
// export const ORDER_WATCHLIST = '[WATCHLIST] ORDER LIST';

export function getWatchlist(id) {
  const request = Api.getWatchlist(id);

  return (dispatch, getState) => {
    request.then(response => {
      return dispatch({
        type: GET_WATCHLIST,
        payload: response.data,
      });
    });
  };
}

export function getWatchlistData(id) {
  const request = Api.getMarketBatchData();
  return dispatch => {
    dispatch({});
  };
}

export function deleteWatchlistSymbol(symbol, id) {
  return dispatch => {
    dispatch({
      type: DELETE_WATCHLIST_SYMBOL,
      id,
      symbol,
    });
  };
}
