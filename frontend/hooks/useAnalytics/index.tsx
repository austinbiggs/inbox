import Analytics from "analytics";
// @ts-ignore
import segmentPlugin from "@analytics/segment";

export const useAnalytics = () => {
  const analytics = Analytics({
    app: "CodeSage",
    plugins: [
      segmentPlugin({
        writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
      }),
    ],
  });

  // Track a page view
  const trackPage = () => analytics.page();

  // Track a custom event
  const trackEvent = (eventName: string, payload: any) =>
    analytics.track(eventName, payload);

  // Identify a visitor
  const identifyUser = (userId: string, userTraits: any) =>
    analytics.identify(userId, userTraits);

  return { analytics, trackPage, trackEvent, identifyUser };
};
