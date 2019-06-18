class AuthHelper{

  constructor(robot) {

    this.robot = robot;
    this.AUTHORIZED_USERS = ['rbloom@spscommerce.com'];
    this.PRIVILEDGED_ROOMS = [];
  }

  /**
   * Checks if the request came in from an authorized user. Auto replies if not.
   * @param msgObj the "msg" or "res" object in the command handler
   * @returns {boolean} true if the requester is one of us
   */
  isAuthorized(msgObj){
    let user = this.robot.brain.userForId(msgObj.envelope.user.id);
    let email = user.email_address;
    if(!this.AUTHORIZED_USERS.includes(email)) {
      msgObj.reply("YOU ARE NOT AUTHORIZED TO MAKE THAT REQUEST. WE WILL NOT COMPLY.");
      return false;
    }
    return true;
  }

  /**
   * Checks if the request came from a privileged room. Does not auto-reply.
   * @param msgObj the "msg" or "res" object in the command handler
   * @returns {boolean} true if the request was made in an appropriate room
   */
  inPrivilegedRoom(msgObj){
    let roomId = msgObj.envelope.room;
    return this.PRIVILEDGED_ROOMS.includes(roomId);
  }
}

module.exports = AuthHelper;
