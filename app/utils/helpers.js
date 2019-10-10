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
