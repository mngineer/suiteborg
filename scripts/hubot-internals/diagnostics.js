'use strict';

// Description
//   hubot scripts for diagnosing hubot - modified for the Borg.
//
// Commands:
//   hubot ping - Reply with pong
//   hubot adapter - Reply with the adapter
//   hubot echo <text> - Reply back with <text>
//   hubot time - Reply with current time
//
// Author:
//   Josh Nichols <technicalpickles@github.com>

module.exports = function (robot) {
  robot.respond(/PING$/i, msg => {
    msg.send('PONG')
});

  robot.respond(/ADAPTER$/i, msg => {
    msg.send(robot.adapterName.toUpperCase())
});

  robot.respond(/ECHO (.*)$/i, msg => {
    msg.send(msg.match[1].toUpperCase())
});

  robot.respond(/TIME$/i, msg => {
    msg.send(`Server time is: ${new Date()}`.toUpperCase())
});

  robot.respond(/channel me (.*)/i, msg => {
    let slack = new SlackHelper(msg);
    slack.getIdFromChannel(msg.match[1],
      (success) => {
        msg.send(`THE CHANNEL ID IS ${success}`);
      }
    )
    });

  robot.respond(/debug me/i, function(msg) {
    console.log("Debug Me: ", Object(msg));
    return msg.send("WE HAVE LOGGED YOUR DETAILS TO THE CONSOLE.");
  });

  robot.respond(/whoami/i, function(msg) {
    var user;
    console.log("whoami: " + JSON.stringify(robot.brain.userForId(msg.envelope.user.id)));
    user = robot.brain.userForId(msg.envelope.user.id);
    return msg.send(`HELLO @${user.name}, ${user.real_name}, (${user.email_address})`);
  });

  robot.respond(/channels/i, msg => {
    let slack = new SlackHelper(robot);
    let auth = new AuthHelper(robot);
    if (!auth.isAuthorized(msg) || !auth.inPrivilegedRoom(msg)){
      //noop the command.
      return;
    }
    slack.getJoinedChannels(
      (success) => {
        let list = "\n";
        for (let index in success){
          list += `${success[index]}\n`
        }
        msg.send(`WE HAVE ASSIMILATED THESE CHANNELS:${success}`);
      }
    )
  });
};
