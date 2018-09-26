// Description:
//   Receive Kittehs OnDemand
//
// Dependencies:
//   None
//
// Configuration:
//   CAT_API_KEY - apikey for the Cat API
//
// Commands:
//   hubot cat|kitten|kitty|kitteh me  - get a cat
//   hubot cat|kitten|kitty|kitteh bomb (number)  - get number cats

let CAT_API_URL = "https://api.thecatapi.com/v1/images/search";
let CAT_HEADERS = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.CAT_API_KEY
  }
};
let OUR_REPOS = [];




module.exports = function (robot) {

  let catApiCall = (msgObj, limit) => {
    msgObj.http(`${CAT_API_URL}?limit=${limit}`, CAT_HEADERS).get()((err, resp, body) => {
      if (err) {throw err;}

      if (resp.statusCode !== 200) {
        errorObj = {
          script: "kitteh_v2.js",
          url: `${CAT_API_URL}?limit=${limit}`,
          response: resp.statusCode,
          body: body
        };
        msgObj.reply("WE WERE UNABLE TO ASSIMILATE KITTEHS.");
        robot.brain.set("borgerror",JSON.stringify(errorObj));
        robot.logger.error(JSON.stringify(errorObj));
        return;
      }

      let apiResponse = JSON.parse(body);
      if (limit === 1){
        msgObj.send(apiResponse[0].url);
      } else {
        for (let index = 0; index < limit; index++) {
          msgObj.send(apiResponse[index].url);
        }
      }
    });
  };

  robot.respond(/(cat|kitten|kitty|kitteh) me/i, (msg) => {
    catApiCall(msg, 1);
  });

  robot.respond(/(cat|kitten|kitty|kitteh) bomb ?(\d*)?/i, (msg) => {
    console.log(msg.match[2]);
    let bombSize = Number.parseInt(msg.match[2]) || 5;
    if (bombSize > 25) { bombSize = 25;}
    catApiCall(msg, bombSize);
  });
};
