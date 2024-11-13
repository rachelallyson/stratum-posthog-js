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

  publish<
    T extends PosthogEventId,
    Props extends Properties<T, PosthogCatalog>,
  >(
    key: T,
    options: Partial<UserDefinedEventOptions> & {
      pluginData: {
        PosthogPlugin: {
          properties: Props;
        };
      };
    },
  ): Promise<boolean>;

  publish<T extends PosthogEventId, Props extends undefined>(
    key: T,
    options?: undefined, // Optional when Props is undefined
  ): Promise<boolean>;
  publish<
    T extends PosthogEventId,
    Props extends Properties<T, PosthogCatalog> | undefined,
  >(
    key: T,
    options: Props extends undefined
      ? undefined
      : Partial<UserDefinedEventOptions> & {
          pluginData: {
            PosthogPlugin: {
              properties: Props;
            };
          };
        },
  ): Promise<boolean> {
    return super.publish(key, options);
  }
}

export default PosthogService;
