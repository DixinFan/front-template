import moment from 'moment';

export const DateFormat = (timestamp, dateFormat = 'YYYY-MM-DD HH:mm:ss') => {
  if (timestamp <= 1000000000000) {
    timestamp *= 1000;
  }
  return moment(timestamp).format(dateFormat);
}
