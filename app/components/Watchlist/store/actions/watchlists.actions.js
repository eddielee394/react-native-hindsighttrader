import Api from '../../../../services/api';

export const GET_WATCHLISTS = '[WATCHLISTS] GET WATCHLISTS';
export const CREATE_WATCHLIST = '[WATCHLISTS] CREATE WATCHLIST';
export const DELETE_WATCHLIST = '[WATCHLISTS] DELETE WATCHLIST';

export function getWatchlists() {
  const request = Api.getWatchlists();

  return dispatch =>
    request.then(response => {
      return dispatch({
        type: GET_WATCHLISTS,
        payload: response.data,
      });
    });
}

export function createWatchlist(name) {
  const request = Api.createWatchlist(name);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: CREATE_WATCHLIST,
        payload: response.data,
      }),
    );
}

export function deleteWatchlist(id) {
  return dispatch => {
    return dispatch({ type: DELETE_WATCHLIST, payload: id });
  };
}
