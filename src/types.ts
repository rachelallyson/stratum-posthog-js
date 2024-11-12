import {
  EventOptions,
  StratumSnapshot,
} from "@capitalone/stratum-observability";
import { CatalogEvent } from "@capitalone/stratum-observability";
export enum PosthogEventTypes {
  CAPTURE = "capture",
  ERROR = "error",
}

export interface PosthogPluginOptions {
  POSTHOG_HOST: string;
  POSTHOG_KEY: string;
}

export type Properties<
  PosthogEventId extends string,
  PosthogCatalog extends Record<PosthogEventId, { properties?: any }>,
> = PosthogCatalog[PosthogEventId]["properties"];

interface PosthogEventOptions extends Partial<EventOptions> {
  data?: {
    properties: { [key: string]: any };
  };
}
export interface PosthogSnapshot extends StratumSnapshot {
  eventOptions?: PosthogEventOptions;
}

export interface PosthogEvent<EventId extends string = string>
  extends CatalogEvent<PosthogEventTypes> {
  id: EventId;
  description: string;
  properties?: { [key: string]: any }; // will be overridden by the catalog
}

export type PosthogEventCatalog<
  EventId extends string,
  Catalog extends { [K in EventId]: PosthogEvent<K> },
> = {
  [K in keyof Catalog]: Catalog[K];
};

export type GenericPosthogCatalog<EventId extends string> = {
  [K in EventId]: PosthogEvent<K>;
};
