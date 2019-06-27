// Description:
//   Post cat related HTTP code definitions
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot http [code]  - Who's that HTTP code?
//
// Author:
//   Ryan

module.exports = function (robot) {
    robot.respond(/http (\d\d\d)/i, (msg) => {
      let code = msg.match[1];
      msg.http(`https://http.cat/${code}.jpg`).get()((err, resp, body) => {
        if (err) {
          throw err;
        }
        if (resp.statusCode !== 200) {
          msg.reply("THAT CODE IS IRRELEVANT.");
          return;
        }
        msg.reply(`https://http.cat/${code}.jpg`);
      });
    });
};
