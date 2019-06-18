// Description:
//   Receive Puppers OnDemand
//
// Dependencies:
//   None
//
// Configuration:
//   DOG_API_KEY - apikey for the Dog API
//
// Commands:
//   hubot (dog|doggo|puppy|pupper) me  - get a dog
//   hubot (dog|doggo|puppy|pupper) bomb (number)  - get number dogs

let DOG_API_URL = "https://api.thedogapi.com/v1/images/search";
let OUR_REPOS = ["suiteborg"];
let REPO_FILTER = process.env.ENABLE_REPO_FILTER;


let DOG_HEADERS = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.DOG_API_KEY
  }
};

let dogApiCall = (msgObj, limit) => {
  msgObj.http(`${DOG_API_URL}?limit=${limit}`, DOG_HEADERS).get()((err, resp, body) => {
    if (err) {throw err;}

    if (resp.statusCode !== 200) {
      errorObj = {
        script: "pupper.js",
        url: `${DOG_API_URL}?limit=${limit}`,
        response: resp.statusCode,
        body: body
      };
      msgObj.reply("WE WERE UNABLE TO ASSIMILATE PUPPERS.");
      msgObj.brain.data.borgerror = JSON.stringify(errorObj);
      msgObj.logger.error(JSON.stringify(errorObj));
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

module.exports = function (robot) {
    robot.respond(/(dog|doggo|puppy|pupper) me/i, (msg) => {
      dogApiCall(msg, 1);
    });

    robot.respond(/(dog|doggo|puppy|pupper) bomb ?(\d*)?/i, (msg) => {
      console.log(msg.match[2]);
      let bombSize = Number.parseInt(msg.match[2]) || 5;
      if (bombSize > 25) { bombSize = 25;}
      dogApiCall(msg, bombSize);
    });

  robot.hear(/github\.com\/mngineer\/(.*)\/pull\/(\d+)/, (msg) => {
    let repo = msg.match[1];
    let user = robot.brain.userForId(msg.envelope.user.id);
    let isOwnRepo = REPO_FILTER ? OUR_REPOS.includes(repo): true;
    if (!isOwnRepo){
      return;
    }
    if(true) { //include user.email_address === "" for personalization
      dogApiCall(msg, 1);
    }
  });

};
