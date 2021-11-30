import { format } from "date-fns";

export function formattedTimeFromTimestamp(timestamp: number): string {
  return format(timestamp, 'hh:mm a')
}
