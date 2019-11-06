import Iexcloud from '../iexcloud';
import faker from 'faker';
import { load } from '../../utils/storage';

class Api {
  constructor() {
    this.api = new Iexcloud();
  }

  /**
   * Gets the quote data for a single symbol
   * @param {string} symbol company ticker symbol
   * @param {object} options optional parameters
   * @return {Promise<{data: {*}, message: string}>}
   */
  getQuoteData = async (symbol, options = null) => {
    const response = await this.api.getQuote(symbol);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return Promise.reject(error);
      }
    }

    //Convert the data in a usable format
    const convertData = data => {
      return {
        symbol: data.symbol,
        companyName: data.companyName,
        calculationPrice: data.calculationPrice,
        open: data.open,
        openTime: data.openTime,
        close: data.close,
        closeTime: data.closeTime,
        high: data.high,
        bidPrice: data.iexBidPrice ?? 0,
        bidSize: data.iexBidSize ?? 0,
        askPrice: data.iexAskPrice ?? 0,
        askSize: data.iexAskSize ?? 0,
        low: data.low,
        latestPrice: data.latestPrice,
        latestSource: data.latestSource,
        latestTime: data.latestTime,
        latestUpdate: data.latestUpdate,
        latestVolume: data.latestVolume,
        volume: data.volume,
        extendedPrice: data.extendedPrice,
        extendedChange: data.extendedChange,
        extendedChangePercent: data.extendedChangePercent,
        extendedPriceTime: data.extendedPriceTime,
        previousClose: data.previousClose,
        previousVolume: data.previousVolume,
        change: data.change,
        changePercent: data.changePercent,
        avgTotalVolume: data.avgTotalVolume,
        marketCap: data.marketCap,
        week52High: data.week52High,
        week52Low: data.week52Low,
        ytdChange: data.ytdChange,
        peRatio: data.peRatio,
        lastTradeTime: data.lastTradeTime,
        isUSMarketOpen: data.isUSMarketOpen,
      };
    };

    // transform the data into the format we are expecting
    try {
      const data = convertData(response.data);
      return { message: 'ok', data };
    } catch {
      return { message: 'bad-data', data: response.data };
    }
  };

  /**
   * Gets the chart data for a symbol. By default returns open, high, low & close per defined interval.
   * TODO-EP Add example in docbloc
   * TODO-EP add data type validations
   * @param {string} symbol company ticker symbol
   * @param {string} range chart range 1d|5d|1m|3m|6m|1y
   * @param {number} interval number of minutes
   * @return {Promise<ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example getChartData('aapl','1d',30)
   */
  getChartData = async (symbol, range, interval = 1) => {
    const response = await this.api.getChartBatch(symbol, range, interval);

    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return Promise.reject(error);
      }
    }

    return response;
  };

  /**
   *
   * @param {string} symbol company ticker symbol
   * @param {array} types data types to return chart|news|quote
   * @param {object|null} options optional parameters
   * @return {Promise<array|object>}
   */
  getStockBatchData = async (symbol, types = null, options = null) => {
    const response = await this.api.getBatch(symbol, types, options);

    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return Promise.reject(error);
      }
    }

    return response;
  };

  /**
   * Gets batched data for multiple symbols based on an array of data types to be returned.
   * @param {array} symbols company ticker symbols
   * @param {array} types data types to return chart|news|quote
   * @param {object|null} options optional parameters
   * @return {Promise<ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example getChartData('aapl','1d',30)
   */
  getMarketBatchData = async (symbols, types = null, options = null) => {
    const response = await this.api.getMarketBatch(symbols, types, options);

    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return Promise.reject(error);
      }
    }

    const convertData = data => {
      const convertedData = {
        news: data.news,
        chart: data.chart,
        quote: {
          symbol: data.quote.symbol,
          companyName: data.quote.companyName,
          calculationPrice: data.quote.calculationPrice,
          open: data.quote.open,
          openTime: data.quote.openTime,
          close: data.quote.close,
          closeTime: data.quote.closeTime,
          high: data.quote.high,
          bidPrice: data.quote.iexBidPrice ?? 0,
          bidSize: data.quote.iexBidSize ?? 0,
          askPrice: data.quote.iexAskPrice ?? 0,
          askSize: data.quote.iexAskSize ?? 0,
          low: data.quote.low,
          latestPrice: data.quote.latestPrice,
          latestSource: data.quote.latestSource,
          latestTime: data.quote.latestTime,
          latestUpdate: data.quote.latestUpdate,
          latestVolume: data.quote.latestVolume,
          volume: data.quote.volume,
          extendedPrice: data.quote.extendedPrice,
          extendedChange: data.quote.extendedChange,
          extendedChangePercent: data.quote.extendedChangePercent,
          extendedPriceTime: data.quote.extendedPriceTime,
          previousClose: data.quote.previousClose,
          previousVolume: data.quote.previousVolume,
          change: data.quote.change,
          changePercent: data.quote.changePercent,
          avgTotalVolume: data.quote.avgTotalVolume,
          marketCap: data.quote.marketCap,
          week52High: data.quote.week52High,
          week52Low: data.quote.week52Low,
          ytdChange: data.quote.ytdChange,
          peRatio: data.quote.peRatio,
          lastTradeTime: data.quote.lastTradeTime,
          isUSMarketOpen: data.quote.isUSMarketOpen,
        },
      };

      return convertedData;
    };

    // transform the data into the format we are expecting
    try {
      let data = {};
      for (let key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          data[key] = convertData(response.data[key]);
        }
      }

      return { message: 'ok', data };
    } catch {
      return { message: 'bad-data', data: response.data };
    }
  };

  /**
   * Gets batched data for multiple symbols based on an array of data types to be returned.
   * @param {string} symbol company ticker symbol
   * @param {object|null} options optional parameters
   * @return {Promise<ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example getSymbolNews('aapl','1d',30)
   */
  getSymbolNews = async (symbol, options = null) => {
    const response = await this.api.getNews(symbol, options);

    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return Promise.reject(error);
      }
    }

    const convertData = data => {
      const convertedData = {
        timestamp: data.datetime,
        title: data.headline,
        source: data.source,
        url: data.url,
        summary: data.summary,
        related: data.related,
        image: data.image,
        lang: data.lang,
        hasPaywall: data.hasPaywall,
      };

      return convertedData;
    };

    // transform the data into the format we are expecting
    try {
      let data = response.data;
      data = data.map(item => convertData(item));
      console.tron.log('data', data);

      return { message: 'ok', data };
    } catch {
      return { message: 'bad-data', data: response.data };
    }
  };
  /**
   * Gets the latest price for a single symbol
   * @return {Promise<{message: string}>}
   * @param symbol
   */
  getLatestPrice = async symbol => {
    // make the api call
    const response = await this.api.getQuoteField(symbol, 'latestPrice');

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    const convertData = data => {
      return {
        latestPrice: data.latestPrice,
      };
    };

    // transform the data into the format we are expecting
    try {
      const data = convertData(response.data);
      return { message: 'ok', data };
    } catch {
      return { message: 'bad-data', data: response.data };
    }
  };

  /**
   * Gets historical price data for a single symbol
   * TODO-EP Add example in docbloc
   * TODO-EP add data type validations
   * @param {string} symbol company ticker symbol
   * @param {string} range time range of data
   * @param {object} options optional paramters
   * @return {Promise<ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example
   */
  getHistPrice = async (symbol, range, options = null) => {
    const response = await this.api.getHistPrice(symbol, range, options);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    return response;
  };

  /**
   * Gets the company info for a single symbol
   * TODO-EP Add example in docbloc
   * TODO-EP add data type validations
   * @param {string} symbol company ticker symbol
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example
   */
  getCompany = async symbol => {
    const response = await this.api.getCompany(symbol);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    return response;
  };

  /**
   * Gets an array of quotes for up to 10 symbols in a collection
   * TODO-EP Add example in docbloc
   * TODO-EP add data type validations
   * @param collection
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example
   */
  getCollection = async collection => {
    const response = await this.api.getCollection(collection);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }
    return response;
  };

  /**
   * Gets financial information for a single symbol
   * TODO-EP Add example in docbloc
   * TODO-EP add data type validations
   * @param {string} symbol company ticker symbol
   * @return {Promise<ApiResponse<T>|ApiErrorResponse<T>|ApiOkResponse<boolean>>}
   * @example
   */
  getFinancials = async symbol => {
    const response = await this.api.getFinancials(symbol);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    return response;
  };

  /**
   * Gets the url to a png image of the logo for a single symbol
   * TODO-EP Add example in docbloc
   * TODO-EP add data type validations
   * @param {string} symbol company ticker symbol
   * @return {Promise<{data: *, message: string}>}
   * @example
   */
  getLogo = async symbol => {
    const response = await this.api.getLogo(symbol);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    const convertData = data => {
      return {
        url: data.url,
      };
    };

    // transform the data into the format we are expecting
    try {
      const data = convertData(response.data);
      return { message: 'ok', data };
    } catch {
      return { message: 'bad-data', data: response.data };
    }
  };

  /**
   * Returns a list of symbols
   * @return {Promise<{data: *, message: string}|{temporary: boolean, message: string}|{temporary: boolean, message: string}|{message: string}|{temporary: boolean, message: string}|{message: string}|*|{symbol: *, companyName: *}[]>}
   */
  getSymbols = async () => {
    const response = await this.api.getSymbols();

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    const convertData = data => {
      return {
        symbol: data.symbol,
        companyName: data.name,
      };
    };

    // transform the data into the format we are expecting
    try {
      const rawData = response.data;
      const data = rawData.map(d => convertData(d));
      return { data };
    } catch {
      return { message: 'bad-data', data: response.data };
    }
  };

  /**
   *
   * @return {Promise<{data: *, message: string}|{temporary: boolean, message: string}|{temporary: boolean, message: string}|{message: string}|{temporary: boolean, message: string}|{message: string}|*|{data: *}>}
   */
  getWatchlists = async () => {
    let response = await load('persist:root');
    response = { ...response, ...JSON.parse(response.data.watchlists) };

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    const convertData = data => {
      return {
        id: data.id,
        name: data.name,
        symbols: data.symbols || [],
      };
    };

    // transform the data into the format we are expecting
    try {
      const rawData = response.data;
      const data = rawData.map(d => convertData(d));
      return { data: data };
    } catch {
      return { message: 'bad-data', data: response };
    }
  };

  /**
   *
   * @param name
   * @param symbols
   * @return {Promise<{data: *, message: string}|{temporary: boolean, message: string}|{temporary: boolean, message: string}|{message: string}|{temporary: boolean, message: string}|{message: string}|*|{data: *}>}
   */
  createWatchlist = async (name, symbols = []) => {
    const requestData = () => {
      return new Promise(resolve =>
        resolve({ ok: true, data: { name: name, symbols: symbols } }),
      );
    };

    const response = await requestData();

    // the typical ways to die when calling an api
    if (!response.ok) {
      const error = this.getGeneralApiError(response);

      if (error) {
        console.log('Api problem', error);
        return error;
      }
    }

    const convertData = data => {
      return {
        id: faker.unique(faker.random.uuid),
        name: data.name,
        symbols: data.symbols || [],
      };
    };

    // transform the data into the format we are expecting
    try {
      const data = convertData(response.data);
      return { data: data };
    } catch {
      return { message: 'bad-data', data: response.data };
    }
  };

  /**
   * Attempts to get a common cause of problems from an api response.
   *
   * @param response The api response.
   */
  getGeneralApiError = response => {
    switch (response.problem) {
      case 'CONNECTION_ERROR':
        return { message: 'cannot-connect', temporary: true };
      case 'NETWORK_ERROR':
        return { message: 'cannot-connect', temporary: true };
      case 'TIMEOUT_ERROR':
        return { message: 'timeout', temporary: true };
      case 'SERVER_ERROR':
        return { message: 'server' };
      case 'UNKNOWN_ERROR':
        return { message: 'unknown', temporary: true };
      case 'CLIENT_ERROR':
        switch (response.message) {
          case 401:
            return { message: 'unauthorized' };
          case 403:
            return { message: 'forbidden' };
          case 404:
            return { message: 'not-found', data: response.data };
          default:
            return { message: 'rejected', data: response.data };
        }
      case 'CANCEL_ERROR':
        return null;
    }

    return null;
  };
}

const instance = new Api();

export default instance;
