import { PosthogEvent } from "./types";
export function createPosthogCatalog<
  EventId extends string,
  T extends Record<EventId, Omit<PosthogEvent, "id">> & {
    [K in keyof T]: K extends EventId ? T[K] : never;
  },
>(events: T) {
  const catalog = {} as {
    [K in keyof T]: { id: K } & T[K];
  };

  (Object.keys(events) as (keyof T)[]).forEach((key) => {
    catalog[key] = {
      ...events[key],
      id: key as any,
    };
  });

  return catalog;
}
