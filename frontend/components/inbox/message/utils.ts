import { format, formatDistance, parseISO } from "date-fns";

export function formattedTimeFromTimestamp(timestamp: string): string {
  return format(parseISO(timestamp), "hh:mm a");
}

export function relativeTimefromTimestamp(timestamp: string): string {
  return formatDistance(parseISO(timestamp), new Date(), { addSuffix: true });
}
