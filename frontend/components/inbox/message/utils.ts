import { format, parseISO } from "date-fns";

export function formattedTimeFromTimestamp(timestamp: string): string {
  return format(parseISO(timestamp), 'hh:mm a')
}
