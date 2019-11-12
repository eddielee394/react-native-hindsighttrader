import Api from '../../../../services/api';
export const SET_LAST_UPDATED = '[STOCKS ] SET_LAST_UPDATED';
export const SET_SYMBOL = '[STOCKS] SET SYMBOL';
export const GET_COMPANY_INFO = '[STOCKS] GET COMPANY INFO';
export const GET_COMPANY_INFO_SUCCESS = '[STOCKS] GET COMPANY INFO SUCCESS';
export const GET_COMPANY_INFO_ERROR = '[STOCKS] GET COMPANY INFO ERROR';
export const GET_NEWS_DATA = '[STOCKS] GET NEWS DATA';
export const GET_NEWS_DATA_SUCCESS = '[STOCKS] GET NEWS DATA SUCCESS';
export const GET_NEWS_DATA_ERROR = '[STOCKS] GET NEWS DATA ERROR';

export function setLastUpdated() {
  const updatedAt = new Date();
  return {
    type: SET_LAST_UPDATED,
    payload: updatedAt,
  };
}

export function setSymbol(symbol) {
  return dispatch => {
    dispatch({
      type: SET_SYMBOL,
      payload: symbol,
    });

    return dispatch(getCompanyInfo(symbol));
  };
}

export function getCompanyInfo(symbol) {
  //TODO-EP add error condition to getCompanyInfo action
  const request = Api.getCompany(symbol);
  return dispatch => {
    dispatch({ type: GET_COMPANY_INFO });

    request.then(response =>
      dispatch({ type: GET_COMPANY_INFO_SUCCESS, payload: response.data }),
    );
  };
}

export function getNewsData(symbol) {
  //TODO-EP add error condition to getNewsData action
  const request = Api.getSymbolNews(symbol);
  return dispatch => {
    dispatch({ type: GET_NEWS_DATA });

    request.then(response =>
      dispatch({ type: GET_NEWS_DATA_SUCCESS, payload: response.data }),
    );
  };
}
