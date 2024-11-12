import {
  StratumService,
  StratumServiceOptions,
  UserDefinedEventOptions,
} from "@capitalone/stratum-observability";

import { GenericPosthogCatalog, Properties } from "./types";

class PosthogService<
  PosthogEventId extends string,
  PosthogCatalog extends GenericPosthogCatalog<PosthogEventId>,
> extends StratumService {
  constructor(
    options: Omit<StratumServiceOptions, "catalog"> & {
      catalog: Omit<StratumServiceOptions["catalog"], "items"> & {
        items: PosthogCatalog;
      };
    },
  ) {
    super(options);
  }
  // Override the publish method to return a different type
  publish<
    T extends PosthogEventId,
    Props extends Properties<T, PosthogCatalog>,
  >(
    key: T,
    options: Props extends unknown
      ? Partial<UserDefinedEventOptions> & {
          pluginData: {
            PosthogPlugin: {
              properties: Props;
            };
          };
        }
      : undefined, // Make options required if Props is defined
  ): Promise<boolean> {
    return super.publish(key, options);
  }
}

export default PosthogService;
