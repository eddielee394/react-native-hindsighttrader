import Api from '../../../../services/api';
import { showMessage } from '../../../../store/actions';
export const GET_CHART = '[STOCKS ] GET CHART';
export const GET_CHART_SUCCESS = '[STOCKS ] GET CHART SUCCESS';
export const GET_CHART_ERROR = '[STOCKS ] GET CHART ERROR';

export function getChart(symbol,range) {
  console.log('action.getChart', symbol);
  const request = Api.getChartData(symbol,range);

  return dispatch => {
    dispatch({
      type: GET_CHART,
    });
    request
      .then(response =>
        dispatch({
          type: GET_CHART_SUCCESS,
          payload: response.data,
        }),
      )
      .catch(error => {
        dispatch({
          type: GET_CHART_ERROR,
        });
        dispatch(showMessage(error.message));
      });
  };
}
