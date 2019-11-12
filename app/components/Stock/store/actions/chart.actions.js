import Api from '../../../../services/api';
import { showMessage } from '../../../../store/actions';
export const GET_CHART = '[STOCK] GET CHART';
export const GET_CHART_SUCCESS = '[STOCK] GET CHART SUCCESS';
export const GET_CHART_ERROR = '[STOCK] GET CHART ERROR';
export const TOGGLE_RANGE = '[STOCK] TOGGLE RANGE';

//Todo need to figure out what to do with these Range constants
export const RANGE = {
  oneMonth: {
    label: '1m',
    range: '1m',
  },
  threeMonths: {
    label: '3m',
    range: '3m',
  },
  sixMonths: {
    label: '6m',
    range: '6m',
  },
  oneYear: {
    label: '1y',
    range: '1y',
  },
};

export function getChart(symbol, range) {
  const request = Api.getChartData(symbol, range);

  return dispatch => {
    dispatch({
      type: GET_CHART,
    });
    request
      .then(response => {
        return dispatch({
          type: GET_CHART_SUCCESS,
          payload: response.data.chart,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_CHART_ERROR,
          payload: error.message,
        });
        return dispatch(showMessage(error.message));
      });
  };
}

export function toggleRange(range) {
  return dispatch => dispatch({ type: TOGGLE_RANGE, range });
}
