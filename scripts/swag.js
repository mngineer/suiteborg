// Generated by CoffeeScript 2.3.1
// Description:
//   Swags out a story
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot swag me - Gives a Simple Wild Ass Guess
//
// Author:
//   Ryan

var points;

points = ["SMALL [2]", "MEDIUM [4]", "LARGE [8]", "EXTRA LARGE [12]", "EPIC [12+]"];

module.exports = function(robot) {
  return robot.respond(/swag?(?: me)?/i, function(res) {
    var answer;
    answer = res.random(points);
    return res.reply(`WE THINK THE STORY IS A ${answer}.`);
  });
};
