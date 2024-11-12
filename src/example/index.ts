import { PosthogService, PosthogPlugin } from "..";
import { catalog, EVENT_ID } from "./catalog";

const POSTHOG_HOST = "https://your-posthog-host.com";
const POSTHOG_KEY = "your-posthog-key";
export const stratumService = new PosthogService({
  catalog: {
    items: catalog,
  },

  plugins: [
    PosthogPlugin({
      POSTHOG_HOST: POSTHOG_HOST,
      POSTHOG_KEY: POSTHOG_KEY,
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


stratumService.publish(EVENT_ID.LOADED, {
  pluginData: {
    PosthogPlugin: {
      properties: {
        loadedAt: new Date(),
      },
    }
  },
});

stratumService.publish(EVENT_ID.GENERIC_ERROR, {
  pluginData: {
    PosthogPlugin: {
      properties: {
        error: new Error(),
        message: "Something went wrong",
      },
    },
  },
});