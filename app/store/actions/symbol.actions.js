export const SET_SYMBOL = '[SYMBOL] SET SYMBOL';

export function setSymbol(symbol) {
  return {
    type: SET_SYMBOL,
    payload: symbol,
  };
}
