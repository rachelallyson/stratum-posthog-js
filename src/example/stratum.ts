import { PosthogService, PosthogPlugin } from "..";
import { catalog, EVENT_ID } from "./catalog";

const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://your-posthog-host.com";
const POSTHOG_KEY = process.env.POSTHOG_KEY || "your-posthog-key";

export const stratumService = new PosthogService({
  catalog: {
    items: catalog,
  },

  plugins: [
    PosthogPlugin({
      POSTHOG_HOST: POSTHOG_HOST,
      POSTHOG_KEY: POSTHOG_KEY,
      DEBUG: true,
    }),
  ],

  /**
  * The canonical name for referring to this capability
  */
  productName: "mission-sync",

  /**
  * Typically, this references the version of the application you're
  * publishing observability events from
  */
  productVersion: "0.1",
});


