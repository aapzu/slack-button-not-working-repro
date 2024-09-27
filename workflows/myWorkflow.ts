import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { MyFunctionDefinition } from "../functions/myFunction.ts";

export const MyWorkflow = DefineWorkflow({
  callback_id: "myWorkflow",
  title: "My workflow",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel to send the message to",
      },
      message: {
        type: Schema.types.string,
        description: "Message to be posted",
      },
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["channel", "message", "interactivity"],
  },
});

const inputForm = MyWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "My workflow input formt",
    interactivity: MyWorkflow.inputs.interactivity,
    submit_label: "Foobar",
    description: "Foobar",
    fields: {
      elements: [{
        name: "channel",
        type: Schema.slack.types.channel_id,
        description: "Channel to send the message to",
        default: MyWorkflow.inputs.channel,
      }, {
        name: "message",
        type: Schema.types.string,
        description: "Message to be posted",
        long: true,
      }],
      required: ["message"],
    },
  },
);

MyWorkflow.addStep(
  MyFunctionDefinition,
  {
    channel: inputForm.outputs.fields.channel,
    message: inputForm.outputs.fields.message,
  },
);

export default MyWorkflow;
