import formatDistance from "date-fns/formatDistance";
import compareAsc from "date-fns/compareAsc";
import differenceInDays from "date-fns/differenceInDays";
import setSeconds from "date-fns/setSeconds";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import isSameDay from "date-fns/isSameDay";

export const getFormattedDistanceToDateToNow = d => {
  let date = setTimeToMidday(new Date(d));
  const now = setTimeToMidday(new Date());

  if (isSameDay(date, now)) return "Today";

  const compare = compareAsc(date, now);

  if (differenceInDays(date, now) === 0)
    return compare === -1 ? "yesterday" : "Tomorrow";

  return compare === -1
    ? `${formatDistance(d, now)} ago`
    : `in ${formatDistance(d, now)}`;
};

const setTimeToMidday = d => {
  return setSeconds(setMinutes(setHours(d, 12), 0), 0);
};
