import { BaseEventModel } from "@capitalone/stratum-observability";

import { PosthogEvent, PosthogSnapshot } from "./types";

// Pass your PosthogEvent interface into the base EventModel
// this seems like it runs on the PosthogCatalog, not when the event is published??
export class BasePosthogEventModel extends BaseEventModel<PosthogEvent> {
  get id() {
    return this.item.id;
  }

  // Override to include any custom run-time validation rules
  protected checkValidity(): boolean {
    const isValid = super.checkValidity();

    return isValid;
  }

  getData(options?: PosthogSnapshot): PosthogEvent {
    const item = super.getData(options);

    const properties = options?.eventOptions?.data?.properties;

    if (properties && item.properties) {
      Object.keys(item.properties).forEach((key) => {
        if (
          properties[key] &&
          typeof item.properties[key] !== typeof properties[key]
        ) {
          throw new Error(
            `Property ${key} is not a type of ${typeof item.properties[key]}`,
          );
        }
        if (!properties[key] && typeof item.properties[key] !== "undefined") {
          throw new Error(`Property ${key} is not defined in the properties`);
        }
      });
    }

    return { ...item, properties };
  }
}

export class PosthogCaptureEventModel extends BasePosthogEventModel {}

export class PosthogErrorEventModel extends BasePosthogEventModel {}
