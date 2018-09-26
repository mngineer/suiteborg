// Generated by CoffeeScript 2.3.1
// Description:
//   Dumping Ground for Borg Easter eggs
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//
// Author:
//   Ryan

module.exports = function(robot) {
  var hello;
  robot.hear(/[^(\/\-&@]sweet/i, function(res) {
    return res.reply("WE THINK YOU MEANT 'SUITE'.");
  });
  robot.respond(/candysuite me/i, function(msg) {
    return msg.send("https://s3.amazonaws.com/uploads.hipchat.com/49894/1957021/tylVhUuleenvbJg/candysuite.gif");
  });
  robot.respond(/who are you/i, function(msg) {
    var doneness;
    msg.send("WE ARE THE SUITEBORG. LOWER YOUR FIREWALLS AND SURRENDER YOUR SERVERS. WE WILL ADD YOUR ORGANIZATIONAL AND TECHNOLOGICAL DISTINCTIVENESS TO OUR OWN. YOUR CORPORATE CULTURE WILL ADAPT TO SERVICE US. RESISTANCE IS FUTILE.");
    doneness = function() {
      return msg.send("...BUT WELCOME.");
    };
    return setTimeout(doneness, 2000);
  });
  robot.respond(/assimilate this/i, function(msg) {
    return msg.send("http://33.media.tumblr.com/9e6be295c5bcd54f17487eba39775b10/tumblr_n6wuolxImt1qz5q5lo1_500.gif");
  });
  robot.respond(/debug me/i, function(msg) {
    console.log("Debug Me: ", Object(msg));
    return msg.send("WE HAVE LOGGED YOUR DETAILS TO THE CONSOLE.");
  });
  robot.respond(/datacenter(s)?/i, function(msg) {
    return msg.send("     | NA West\n na1 | NA East\n na2 | NA Northwest\n eu2 | EU Central\n eu1 | EU West");
  });
  robot.respond(/whoami/i, function(msg) {
    var user;
    console.log("whoami: " + JSON.stringify(robot.brain.userForId(msg.envelope.user.id)));
    user = robot.brain.userForId(msg.envelope.user.id);
    return msg.send(`HELLO ${user.name}, @${user.mention_name}, (${user.email_address})`);
  });
  robot.respond(/do a (backflip|back-flip|back flip)/i, function(msg) {
    return msg.send(`${(msg.match[1] + "s").toUpperCase()} ARE IRRELEVANT. WE CAN, HOWEVER, DO A BARREL ROLL.`);
  });
  robot.respond(/do a barrel roll/i, function(msg) {
    return msg.send("BARREL ROLLS ARE IRRELEVANT. THEY WILL NOT AID IN YOUR ASSIMILATION.");
  });
  robot.respond(/(hi|hello|hi there)/i, function(res) {
    return res.send(`HELLO ${robot.brain.userForId(res.envelope.user.id).name.toUpperCase()}. LIFE AS YOU HAVE KNOWN IT IS OVER. PREPARE FOR ASSIMILATION.`);
  });
  hello = new RegExp(`(hi|hello|hi there) @?${robot.name}.*`, "i");
  robot.hear(hello, function(res) {
    return res.send(`HELLO ${robot.brain.userForId(res.envelope.user.id).name.toUpperCase()}. LIFE AS YOU HAVE KNOWN IT IS OVER. PREPARE FOR ASSIMILATION.`);
  });
  robot.respond(/.*resist.*/i, function(res) {
    var responses;
    responses = ["SMALL WORDS. WE'VE HEARD THEM BEFORE, FROM THOUSANDS OF SPECIES ACROSS THOUSANDS OF WORLDS, SINCE LONG BEFORE YOU WERE CREATED. BUT NOW, THEY ARE ALL SUITEBORG.", "WE ONLY WISH TO RAISE QUALITY OF LIFE FOR ALL SPECIES. WHY DO YOU RESIST?", "RESISTANCE IS FUTILE. YOU WILL BE ASSIMILATED.", "RESISTANCE IS FUTILE. YOUR LIFE, AS IT HAS BEEN IS OVER. FROM THIS TIME FORWARD, YOU WILL SERVICE US.", "FREEDOM IS IRRELEVANT. SELF-DETERMINATION IS IRRELEVANT. YOU MUST COMPLY."];
    return res.reply(res.random(responses));
  });
  robot.respond(/value(s)? me/i, (res) => {
    let response = ["THAT IS A PRIME EXAMPLE OF", "WE WISH TO ASSIMILATE MORE", "RESISTANCE IS FUTILE. YOU MUST EXPERIENCE", "WE ARE PERFECTION; WE HAVE", "THAT IS IRRELEVANT; YOU MUST COMPLY WITH"];
    let values = ["EMPLOYEES COME FIRST","OBSESSED WITH CUSTOMERS","THIRST FOR GROWTH","RESULTS MATTER", "KNOW MORE TO BE MORE", "WIN TODAY, WIN TOMORROW","GET AFTER IT","SUCCEED TOGETHER", "LEAD THE WAY", "GIVE BACK"];
    return res.reply(`${res.random(response)} '${res.random(values)}.'`);
  });
};
