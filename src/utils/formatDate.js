import momentTz from 'moment-timezone';
import moment from 'moment';

import 'moment/min/moment-with-locales'
import 'moment/locale/es'

export function formatDate(value) {
  let newDate = new Date(value);
  var date = momentTz.tz(newDate, "America/Monterrey");
  let dateFormat = date.format('DD MMMM YYYY hh:mm');
  return dateFormat;
}

export function formatDateString(value, format) {
  let newDate = new Date(value);
  var date = momentTz.tz(newDate, "America/Monterrey");
  let dateFormat = date.format(format);
  return dateFormat;
}

export function formatNormal(value, format) {
  moment.locale("es");
  let newDate = new Date(value);
  var date = moment(newDate);
  let dateFormat = date.format(format);
  return dateFormat;
}

export function getDateSumDays(value, format, sumDays) {
  moment.locale("es");
  let newDate = new Date(value);
  var date = moment(newDate);
  let dateFormat = date.add(sumDays, 'days').format(format);
  
  console.log("dateFormat", dateFormat);
  return dateFormat;
}

export function getMomentDate(date) {
  moment.locale("es");
  var newDate = moment(new Date(date), "MM-DD-YYYY");
  return newDate;
}

export function getMomentDateByFormat(date, format) {
  moment.locale("es");
  var newDate = moment(date, "MM-DD-YYYY", "es").format(format);
  return newDate;
}

export function getDaysByMoment(date, format) {
  moment.locale("es");
  var newDate = moment(date, format);

  const day = newDate.day();
  let weekDayName = newDate.format('ddd');
  let weekDayNumber = newDate.format('DD');
  let dayTime = newDate.format('HH:mm');

  return {
    day,
    weekDayName,
    weekDayNumber,
    dayTime,
  };
}