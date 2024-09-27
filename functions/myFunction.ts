import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import * as path from "std/path/mod.ts";
import { SELECT_ID } from "../lib/consts.ts";

const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const root = path.resolve(__dirname, "..");

export const MyFunctionDefinition = DefineFunction({
  callback_id: "myFunction",
  title: "My function",
  source_file: path.relative(root, __filename),
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel to post the message",
      },
      message: {
        type: Schema.types.string,
        description: "Message to be posted",
      },
    },
    required: ["channel", "message"],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

export const MyFunction = SlackFunction(
  MyFunctionDefinition,
  async (
    { client, inputs },
  ) => {
    console.log(inputs.channel);
    await client.chat.postMessage({
      channel: inputs.channel,
      text: inputs.message,
      blocks: [
        {
          type: "section",
          block_id: "block",
          text: {
            type: "mrkdwn",
            text: "Click",
          },
          accessory: {
            text: {
              type: "plain_text",
              text: "me",
            },
            type: "button",
            style: "primary",
            value: "button",
            action_id: SELECT_ID,
          },
        },
      ],
    });
    console.log("posted message");
    return { outputs: {}, completed: true };
  },
);

MyFunction.addBlockActionsHandler(
  [SELECT_ID],
  async ({ body, client }) => {
    await client.chat.postEphemeral({
      channel: body.channel?.id,
      user: body.user.id,
      text: "Button clicked",
    });
  },
);
export default MyFunction;
