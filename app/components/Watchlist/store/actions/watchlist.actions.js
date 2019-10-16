import Api from '../../../../services/api';

export const GET_WATCHLIST = '[WATCHLIST] GET WATCHLIST';
export const GET_WATCHLIST_DATA = '[WATCHLIST] GET WATCHLIST DATA';
export const COPY_WATCHLIST = '[WATCHLIST] COPY WATCHLIST';
export const ORDER_LIST = '[WATCHLIST] ORDER LIST';

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

export function getWatchlistData(id) {}

// export function openWatchlist(id) {
//   return {
//     type: OPEN_WATCHLIST,
//     payload: symbol,
//   };
// }
//
// export function createWatchlist(watchlist) {
//   const request = axios.post('/api/watchlists-app/create-watchlist', {
//     watchlist,
//   });
//   return dispatch =>
//     request.then(response => {
//       dispatch({
//         type: CREATE_WATCHLIST,
//         watchlist: response.data,
//       });
//     });
// }
//
// export function updateWatchlist(watchlist) {
//   const request = axios.post('/api/watchlists-app/update-watchlist', {
//     watchlist,
//   });
//
//   return dispatch =>
//     request.then(response =>
//       dispatch({
//         type: UPDATE_WATCHLIST,
//         watchlist: response.data,
//       }),
//     );
// }
//
// export function removeWatchlist(watchlistId) {
//   const request = axios.post('/api/watchlists-app/remove-watchlist', {
//     watchlistId,
//   });
//   return dispatch =>
//     request.then(() => {
//       dispatch({
//         type: REMOVE_WATCHLIST,
//         id: watchlistId,
//       });
//     });
// }
