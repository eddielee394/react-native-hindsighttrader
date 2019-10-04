import { create } from 'apisauce';
import { APP_CONFIG } from '../../config';
import * as Qs from 'qs';

class Api {
  /**
   * Initialize the apisauce instance
   * @type {ApisauceInstance}
   * @private
   */
  _api = create({
    baseURL: APP_CONFIG.iexcloudApiUrl,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
    },
    paramsSerializer: params => {
      //formats the query strings in a way that the IEX service can interpret
      return Qs.stringify(params, { arrayFormat: 'comma', encode: false });
    },
  });

  constructor() {
    this.setRequestTransformer();
  }

  /**
   * Transforms the request
   * @type {{data: object}}
   * @private
   */
  setRequestTransformer = () => {
    this._api.addRequestTransform(request => {
      //format api key param for iexcloud support
      request.params = {
        ...request.params,
        token: APP_CONFIG.iexcloudPublicKey,
      };
    });
  };

  /**
   * Gets multiple types of data for each symbol
   * @param {array} symbols company ticker symbols
   * @param {array} types types of data to return
   * @param {object} options additional options for types param
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#batch-requests
   */
  getBatch = async (symbols, types, options = null) =>
    await this._api.get(`/stock/market/batch`, {
      symbols: symbols,
      types: types,
      ...options,
    });

  /**
   * Gets the quote data for a single symbol
   * @param {string} symbol company ticker symbol
   * @param {object} options optional parameters
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#quote
   */
  getQuote = async (symbol, options = null) =>
    await this._api.get(`/stock/${symbol}/quote`, { ...options });

  /**
   * Gets the price for a single symbol
   * @param {string} symbol company ticker symbol
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#price
   */
  getPrice = async symbol => await this._api.get(`/stock/${symbol}/price`);

  /**
   * Gets historical price data for a single symbol
   * @param {string} symbol company ticker symbol
   * @param {string} range time range of data
   * @param {object} options optional paramters
   * @return {Promise<ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#historical-prices
   */
  getHistPrice = async (symbol, range, options = null) =>
    await this._api.get(`/stock/${symbol}/chart/${range}`, { ...options });

  /**
   * Gets historical price data for a single symbol for a specific date or date range
   * @param {string} symbol company ticker symbol
   * @param {string} date date data to be requested (YYYYMMDD format)
   * @param {object} options optional paramters
   * @return {Promise<ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#historical-prices
   */
  getHistPriceByDate = async (symbol, date, options = null) =>
    await this._api.get(`/stock/${symbol}/chart/${range}/${date}`, {
      ...options,
    });

  /**
   * Gets the intraday prices of a symbol. By default returns open, high, low & close per 1min data segments
   * @param {string} symbol company ticker symbol
   * @param {object} options optional paramters
   * @return {Promise<ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#intraday-prices
   */
  getIntradayPrice = async (symbol, options = null) =>
    await this._api.get(`/stock/${symbol}/intraday-prices`, {
      ...options,
    });

  /**
   * Gets the company info for a single symbol
   * @param {string} symbol company ticker symbol
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#company
   */
  getCompany = async symbol => await this._api.get(`/stock/${symbol}/company`);

  /**
   * Gets an array of quotes for up to 10 symbols in a collection
   * @param collection
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#collections
   */
  getCollection = async collection =>
    await this._api.get(`/stock/market/collection/${collection}`);

  /**
   * Gets financial information for a single symbol
   * @param {string} symbol company ticker symbol
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#financials
   */
  getFinancials = async symbol => await this._api.get(`/stock/${symbol}/quote`);

  /**
   * Gets the url to a png image of the logo for a single symbol
   * @param {string} symbol company ticker symbol
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example https://www.iexcloud.io/docs/api/#logo
   */
  getLogo = async symbol => await this._api.get(`/stock/${symbol}/logo`);
}

const instance = new Api();

export default instance;
