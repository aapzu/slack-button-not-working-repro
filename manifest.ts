import { Manifest } from "deno-slack-sdk/mod.ts";
import { MyWorkflow } from "./workflows/myWorkflow.ts";
import { MyFunctionDefinition } from "./functions/myFunction.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Button not working repro",
  description: "A repro app",
  icon: "assets/slack_logo.png",
  workflows: [MyWorkflow],
  functions: [MyFunctionDefinition],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});
