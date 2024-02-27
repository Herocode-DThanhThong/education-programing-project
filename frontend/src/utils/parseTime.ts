import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/es';
import i18n from 'i18next';
export const parseTime = (date: string) => {
  const dateParse = new Date(Date.parse(date));
  return dateParse.toUTCString();
};

export const getDateFormat = (date: string) => {
  return moment(date).locale(i18n.language).format('LLLL');
};
