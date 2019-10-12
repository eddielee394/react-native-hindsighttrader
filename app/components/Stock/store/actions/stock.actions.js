import Api from '../../../../services/api';
export const SET_LAST_UPDATED = '[STOCKS ] SET_LAST_UPDATED';
export const OPEN_STOCK = '[STOCKS] OPEN STOCK';

const TYPES = ['quote', 'news', 'chart'];

export function setLastUpdated() {
  const updatedAt = new Date();
  return {
    type: SET_LAST_UPDATED,
    payload: updatedAt,
  };
}
