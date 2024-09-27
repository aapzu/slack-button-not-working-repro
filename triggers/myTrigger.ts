import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import MyWorkflow from "../workflows/myWorkflow.ts";

const myTrigger: Trigger<typeof MyWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "My trigger",
  description: "My trigger",
  workflow: `#/workflows/${MyWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    channel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
    message: {
      value: "foobar",
    },
  },
};

export default myTrigger;
