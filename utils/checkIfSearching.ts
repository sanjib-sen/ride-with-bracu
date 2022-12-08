import { UserModel } from "@prisma/client";
import moment from "moment";
import { minuteToEndSearch } from "../global/variables";
import minutesAgo from "./minutesAgo";
export default function isSearching(data: UserModel): boolean {
  if (
    data.currentLocationName &&
    data.requestedAt &&
    (data.fromBRACU === false || data.fromBRACU === true)
  ) {
    const requestedAtDate = moment(data.requestedAt).toDate();
    if (requestedAtDate > minutesAgo(minuteToEndSearch)) {
      return true;
    }
  }
  return false;
}
