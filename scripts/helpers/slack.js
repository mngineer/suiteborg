

class SlackHelper{
  constructor(robot) {
    this.robot = robot;

    this.slackRoomShortcuts = {
      "general": "CG2730RC1"
    };

    this.botSlackUserId="";
    this.botToken=process.env.HUBOT_SLACK_TOKEN;
    this.AppMessage = class {
      constructor(title, message) {
        this.pretext = "";
        this.author_name="";
        this.author_icon = "";
        this.fallback = `${title} ${message}`;
        this.color = "";
        this.title = title;
        this.title_link = "";
        this.text = message;
        this.fields = [];
        this.thumb_url = "";
        this.ts = (Date.now()/1000);
      }

  };
    this.AppMessageField = class{
      constructor(title, value) {
        this.title = title;
        this.value = value;
        this.short = true;
      }
    };
  };

  /**
   * Resolves the Slack Channel ID from a channel name.
   * @param channelName string containing the human channel name
   * @param callback callback func to call with channelId
   * @returns result of callback
   */
  getIdFromChannel(channelName, callback){
    this.robot.http(`https://api.slack.com/api/users.conversations?token=${this.botToken}&user=${this.botSlackUserId}&types=public_channel,private_channel`)
      .get()((err, resp, body) => {
        if (err) {
          throw err;
        }
        if (resp.statusCode !== 200) {
         let errorObj = {
            script: "slack.js",
            url: "https://api.slack.com",
            response: resp.statusCode,
            body: body
          };
          msg.reply("WE WERE UNABLE TO ASSIMILATE SLACK.");
          msg.brain.set("borgerror", JSON.stringify(errorObj));
          msg.logger.error(JSON.stringify(errorObj));
          return;
        }
        let parsed = JSON.parse(body);
        for (let index in parsed.channels) {
          if(parsed.channels[index].name === channelName){
            console.log("found channel " + parsed.channels[index].name);
            return callback(parsed.channels[index].id);
          }
        }
      }
    );
  };

  /**
   * Gets a list of all channels SuiteBorg is part of.
   * @param callback function that gets called with a formatted list of channels
   * @returns whatever the callback returns (strings formatted as "#channel (channelId)")
   */
  getJoinedChannels(callback){
    this.robot.http(`https://api.slack.com/api/users.conversations?token=${this.botToken}&user=${this.botSlackUserId}&types=public_channel,private_channel`)
      .get()((err, resp, body) => {
          if (err) {
            throw err;
          }
          if (resp.statusCode !== 200) {
            let errorObj = {
              script: "slack.js",
              url: "https://api.slack.com",
              response: resp.statusCode,
              body: body
            };
            msg.reply("WE WERE UNABLE TO ASSIMILATE SLACK.");
            msg.brain.set("borgerror", JSON.stringify(errorObj));
            msg.logger.error(JSON.stringify(errorObj));
            return;
          }
          let parsed = JSON.parse(body);
          let response = [];
          for (let index in parsed.channels) {
            response.push(`#${parsed.channels[index].name} (${parsed.channels[index].id})`);
            }
          return callback(response);
        }
      );
  };

  /**
   * Sends an "attachment" style message to a channel
   * @param channelId channel id to send the message to
   * @param slackMessage a Slack.AppMessage object
   */
  sendMessageToChannel(channelId, slackMessage){
    let slackPayload = {
      channel: channelId,
      attachments: [slackMessage]
    };
    this.robot.logger.debug("slack.sendMessageToChannel: " + JSON.stringify(slackPayload));
    this.robot.http(`https://api.slack.com/api/chat.postMessage`).headers(
      {"Content-Type": "application/json",
      "Authorization": `Bearer ${this.botToken}`}
    )
      .post(JSON.stringify(slackPayload))((err, resp, body) => {
          if (err) {
            throw err;
          }
          if (resp.statusCode !== 200) {
            let errorObj = {
              script: "slack.js",
              url: "https://api.slack.com/api/chat.postMessage",
              response: resp.statusCode,
              body: body
            };
            robot.brain.set("borgerror", JSON.stringify(errorObj));
            robot.logger.error(JSON.stringify(errorObj));
            throw new Error(`SlackError: ${body}`);
          }
          let parsed = JSON.parse(body);
          if (parsed.ok !== true){
            throw new Error(`SlackError: ${parsed.error}`);
          }
        }
      );
  };

  /**
   * Sends an "attachment" style message to a channel at a specific time.
   * @param channelId channel id to send the message to
   * @param slackMessage a Slack.AppMessage object
   * @param epochTimeToPostInSecs a Number that is the unix epoch timestamp in seconds to send the message at
   */
  sendMessageToChannelLater(channelId, slackMessage, epochTimeToPostInSecs){
    let slackPayload = {
      channel: channelId,
      postAt: epochTimeToPostInSecs
    };
    if (slackMessage instanceof this.AppMessage){
      slackPayload.attachments = [slackMessage];
    } else {
      slackPayload.text = slackMessage;
    }
    this.robot.logger.debug("sendMessageToChannelLater: " + JSON.stringify(slackPayload));
    this.robot.http(`https://api.slack.com/api/chat.scheduleMessage`).headers(
      {"Content-Type": "application/json",
        "Authorization": `Bearer ${this.botToken}`}
    )
      .post(JSON.stringify(slackPayload))((err, resp, body) => {
          if (err) {
            throw err;
          }
          if (resp.statusCode !== 200) {
            let errorObj = {
              script: "slack.js",
              url: "https://api.slack.com/api/chat.scheduleMessage",
              response: resp.statusCode,
              body: body
            };
            robot.brain.set("borgerror", JSON.stringify(errorObj));
            robot.logger.error(JSON.stringify(errorObj));
            throw new Error(`SlackError: ${body}`);
          }
          let parsed = JSON.parse(body);
          if (parsed.ok !== true){
            throw new Error(`SlackError: ${parsed.error} (${channelId}) msg: ${slackMessage.fallback}`);
          }
        }
      );
  }
}

module.exports = SlackHelper;
