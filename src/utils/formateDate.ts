// import { format, isToday, isYesterday, formatDistance } from "date-fns";
// import { ru } from "date-fns/locale";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.locale("ru");
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function getFormattedDate(d: string, ordNumb = 0) {
  // console.log(ordNumb, d, dayjs(d).isYesterday());
  if (dayjs(d).isToday()) {
    return `Сегодня, ${dayjs(d).format("HH:mm UTCZ")}`;
  }

  if (dayjs(d).isYesterday()) {
    return `Вчера, ${dayjs(d).format("HH:mm UTCZ")}`;
  }

  return `${dayjs(d).fromNow()}`;
}
