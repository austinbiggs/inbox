import { format, formatDistance, formatRelative, Locale, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";

const formatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: 'dd.MM.yyyy',
} as const;

const locale: Locale = {
  ...enUS,
  formatRelative: (token: any) => formatRelativeLocale[token],
};

const TODAY = new Date();

export function formattedTimeFromTimestamp(timestamp: string): string {
  return format(parseISO(timestamp), "hh:mm a");
}

export function relativeTimefromTimestamp(timestamp: string): string {
  return formatDistance(parseISO(timestamp), new Date(), { addSuffix: true });
}

export function formattedRelativeTimeFromTimestamp(timestamp: string): string {
  return formatRelative(parseISO(timestamp), TODAY, { locale });
}
