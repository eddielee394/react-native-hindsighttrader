import Api from '../../../../services/api';
import { showMessage } from '../../../../store/actions';
export const GET_CHART = '[STOCK] GET CHART';
export const GET_CHART_SUCCESS = '[STOCK] GET CHART SUCCESS';
export const GET_CHART_ERROR = '[STOCK] GET CHART ERROR';
export const TOGGLE_RANGE = '[STOCK] TOGGLE RANGE';

export const RANGE_1DAY = {
  label: '',
  value: '1d',
};

export const RANGE_1MONTH = {
  label: '1m',
  range: '1m',
};
export const RANGE_3MONTH = {
  label: '3m',
  range: '3m',
};
export const RANGE_6MONTH = {
  label: '6m',
  range: '6m',
};
export const RANGE_1YEAR = {
  label: '1y',
  range: '1y',
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
