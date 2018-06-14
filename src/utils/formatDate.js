import momentTz from 'moment-timezone';
import moment from 'moment';

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