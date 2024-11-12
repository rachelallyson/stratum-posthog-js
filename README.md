# Stratum Posthog Plugin

This is a plugin for Stratum Observability that allows you to send events to Posthog.


## Installation

```bash
npm install @kuzu-media/stratum-posthog-js
```

## Usage

### Initialize the PosthogService
```typescript
import PosthogService, { PosthogPluginFactory } from "@kuzu-media/stratum-posthog-js";
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
```

### Catalog
```typescript
import { createPosthogCatalog , PosthogEventTypes} from "..";

export enum EVENT_ID {
  LOADED = "app-loaded",
  GENERIC_ERROR = "generic-error",
}

const events = {
  [EVENT_ID.LOADED]: {
    description: "This application has loaded for the first time",
    eventType: PosthogEventTypes.CAPTURE,
    properties: {
      // empty to help with type checking
      loadedAt: new Date(),
    },
  },

  [EVENT_ID.GENERIC_ERROR]: {
    description: "A generic error has occurred",
    eventType: PosthogEventTypes.ERROR,
    properties: {
      // empty to help with type checking
      error: new Error(),
      // empty to help with type checking
      message: "",
    },
  },
};

export const catalog = createPosthogCatalog<EVENT_ID, typeof events>(events);
```