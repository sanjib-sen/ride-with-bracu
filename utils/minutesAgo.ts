import moment from "moment";

export default function minutesAgo(minutes: number) {
  return moment().subtract(minutes, "minutes").toDate();
}
