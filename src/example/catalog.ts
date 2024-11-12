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
