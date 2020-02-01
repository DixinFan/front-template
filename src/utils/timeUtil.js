import moment from 'moment';

/*时间处理函数*/
export const secondsFormatTime = (seconds, format = 'YYYY-MM-DD HH:mm:ss') => {
  return millisFormatTime(seconds * 1000, format);
}

export const millisFormatTime = (millis, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(new Date(millis)).format(format);
}

export const secondsFormatDate = (seconds, format = 'YYYY-MM-DD') => {
  return millisFormatDate(seconds * 1000, format);
}

export const millisFormatDate = (millis, format = 'YYYY-MM-DD') => {
  return moment(new Date(millis)).format(format);
}
