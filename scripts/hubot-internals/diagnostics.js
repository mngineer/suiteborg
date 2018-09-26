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
};
