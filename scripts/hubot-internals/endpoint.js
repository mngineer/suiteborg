
module.exports = function(robot) {
  let authToken = process.env.HUBOT_API_KEY;

  let authorized = (request) => {
    let auth = request.get("Authorization");
    return auth !== undefined && auth !== null && auth === `Bearer ${authToken}`;
  };

  let setupComplete;
  robot.router.get(`/${robot.name}/up`, function(req, res) {
    return res.send("WE HAVE ASSIMILATED YOUR HEALTH CHECK.");
  });

  robot.router.get(`/${robot.name}/stop`, function(req, res) {
    res.send('<HTML><head><title>SuiteBorg Emergency Stop</title></head><h1>Assimilate This.</h1><img src="http://33.media.tumblr.com/9e6be295c5bcd54f17487eba39775b10/tumblr_n6wuolxImt1qz5q5lo1_500.gif"><p> > SUITEBORG TERMINATED. PLEASE WAIT FOR RESTART...</p></HTML>');
    return process.exit(1);
  });

  robot.router.get(`/${robot.name}/brain`, (req, res) => {
    if(authorized(req)) {
      console.log(JSON.stringify(robot.brain.data));
      robot.logger.info("Serializing brain to JSON and transmitting.");
      res.send(JSON.stringify(robot.brain.data));
    }
    else {
      res.statusCode = 401;
      res.send("YOU ARE NOT AUTHORIZED. WE WILL NOT COMPLY.");
    }
  });
  robot.router.post(`/${robot.name}/brain`, (req, res) => {
    if(authorized(req)){
      if (req.body !== undefined && req.body !== null){
        robot.logger.info("Data received. Integrating to brain...");
        robot.brain.mergeData(req.body);
      }
    }
    else {
      res.statusCode = 401;
      res.send("YOU ARE NOT AUTHORIZED. WE WILL NOT COMPLY.");
    }
  });
};
