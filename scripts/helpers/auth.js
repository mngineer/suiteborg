class AuthHelper{

  constructor(robot) {

    this.robot = robot;
    this.AUTHORIZED_USERS = ['rbloom@spscommerce.com'];

  }

  isAuthorized(msgObj){
    let user = this.robot.brain.userForId(msgObj.envelope.user.id);
    let email = user.email_address;
    return this.AUTHORIZED_USERS.includes(email)
  }
}

module.exports = AuthHelper;
