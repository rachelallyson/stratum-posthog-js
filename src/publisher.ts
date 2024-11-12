import { BasePublisher } from "@capitalone/stratum-observability";
import posthog, { PostHog } from "posthog-js";

import { BasePosthogEventModel } from "./model";
import {
  PosthogEvent,
  PosthogEventTypes,
  PosthogPluginOptions,
  PosthogSnapshot,
} from "./types";

export class PosthogPublisher extends BasePublisher<PosthogEvent<string>> {
  // Required
  name = "PosthogPublisher";
  posthog?: PostHog;
  constructor(options: PosthogPluginOptions) {
    super();

    this.posthog = posthog.init(options.POSTHOG_KEY, {
      api_host: options.POSTHOG_HOST,
    });
  }

  /**
   * Required
   * Check if your publisher source is available (aka scripts installed, environment
   * is set up, etc.)
   *
   * In this case, we make sure that console.log() is accessible.
   */
  async isAvailable(_model: BasePosthogEventModel) {
    return typeof this.posthog !== "undefined";
  }

  /**
   * Required
   * Map the contents of your event model instance to your event schema
   */
  getEventOutput(
    model: BasePosthogEventModel,
    options?: PosthogSnapshot,
  ): PosthogEvent<string> {
    const data = model.getData(options);

    return data;
  }

  /**
   * Required
   * Send your simple event content to the external publisher
   *
   * In this, case we publish the event to the console log
   */
  async publish(event: PosthogEvent<string>) {
    if (event.eventType === PosthogEventTypes.CAPTURE) {
      this.posthog?.capture(event.id, event.properties);
    } else if (event.eventType === PosthogEventTypes.ERROR) {
      this.posthog?.capture("$exception", event.properties);
    }
  }
}
