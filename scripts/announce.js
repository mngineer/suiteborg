// Description:
//   Script description here
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot announce <something> - Have SuiteBorg disseminate an arbitrary statement across the Collective


let AuthHelper = require("./helpers/auth");
let SlackHelper = require("./helpers/slack");


module.exports = function (robot) {
  let slack = new SlackHelper(robot);
  let CONNECTOR_ROOMS = [];

    robot.respond(/announce (.*)/i, (msg) => {
      let auth = new AuthHelper(robot);
      if (!auth.isAuthorized(msg)) {
        return;
      }

      let message = new slack.AppMessage("", msg.match[1]);
      let user = robot.brain.userForId(msg.envelope.user.id);
      message.author_name = user.real_name;
      message.author_icon = user.slack.profile.image_24;
      message.pretext = "INBOUND MASS COMMUNICATION FROM DEV TEAM";

      for (let i = 0, len = CONNECTOR_ROOMS.length; i < len; i++) {
        let connector = CONNECTOR_ROOMS[i];
        slack.sendMessageToChannel(connector, message);
      }
      return msg.reply("WE HAVE DISSEMINATED THIS INFORMATION ACROSS THE SUITEBORG COLLECTIVE.");
    });
};
