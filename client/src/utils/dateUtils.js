import formatDistance from "date-fns/formatDistance";
import compareAsc from "date-fns/compareAsc";

export const getFormattedDistanceToDateToNow = d => {
  let date = new Date(d);
  const now = new Date();

  const compare = compareAsc(date, now);

  return compare === 0
    ? "today"
    : compare === -1
    ? `${formatDistance(d, now)} ago`
    : `in ${formatDistance(d, now)}`;
};
