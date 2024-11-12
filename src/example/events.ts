import { createPosthogCatalog , PosthogEventTypes} from "../";

export enum EventId {
  LOADED = "app-loaded",
  GENERIC_ERROR = "generic-error",
}

const events = {
  [EventId.LOADED]: {
    description: "This application has loaded for the first time",
    eventType: PosthogEventTypes.CAPTURE,
    properties: {
      // empty to help with type checking
      loadedAt: new Date(),
    },
  },

  [EventId.GENERIC_ERROR]: {
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

export default createPosthogCatalog<EventId, typeof events>(events);
