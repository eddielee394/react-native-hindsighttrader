import moment from 'moment';

/**
 * Formats the date as month day
 * @param date
 * @return {string}
 * @example 2019-12-01
 */
export const formatDateMonthDay = date => {
  return moment(date)
    .format('L')
    .slice(0, -5);
};

export const formatTimeFromNow = timestamp => {
  return moment(timestamp).fromNow();
};

export const formatPercent = val => {
  const num = val * 100;
  return parseFloat(num).toFixed(2) + '%';
};

export const isPositiveChange = val => {
  return val > 0;
};
