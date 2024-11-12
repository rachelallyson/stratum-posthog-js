import { BasePlugin } from "@capitalone/stratum-observability";

import { PosthogCaptureEventModel, PosthogErrorEventModel } from "./model";
import { PosthogPublisher } from "./publisher";
import { PosthogEventTypes, PosthogPluginOptions } from "./types";

/**
 * For TypeScript support, BasePlugin accepts types for
 */
export class PosthogPlugin extends BasePlugin<never, PosthogPluginOptions> {
  name = "PosthogPlugin";

  constructor(options: PosthogPluginOptions) {
    super();
    this.publishers = [new PosthogPublisher(options)];
    this.eventTypes = {
      [PosthogEventTypes.CAPTURE]: PosthogCaptureEventModel,
      [PosthogEventTypes.ERROR]: PosthogErrorEventModel,
    };
  }
}

const PosthogPluginFactory = (options?: PosthogPluginOptions) => {
  if (!options) {
    throw new Error("PosthogPluginOptions are required");
  }

  return new PosthogPlugin(options);
};

export { PosthogPluginFactory };
