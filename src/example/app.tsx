import React from "react";
import { stratumService } from "./stratum";
import { EVENT_ID } from "./catalog";

const App = () => {
  try {
    stratumService.publish(EVENT_ID.LOADED, {
      pluginData: {
        PosthogPlugin: {
          properties: {
            loadedAt: new Date(),
          },
        }
      },
    });
  } catch (error: any) {
    stratumService.publish(EVENT_ID.GENERIC_ERROR, {
      pluginData: {
        PosthogPlugin: {
          properties: {
            error: error as Error,
            message: error.message,
          },
        },
      },
    });
  }
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>React Example</h1>
      <p>This is a simple app running in a simulated React environment.</p>
    </div>
  );
};

export default App;