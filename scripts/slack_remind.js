// Description:
//   Forgetful? Add reminders!
//
// Dependencies:
//   "chrono-node": "^0.1.10"
//   "moment": "^2.8.1"
//
// Configuration:
//   None
//
// Commands:
//   hubot remind me (on <date>|in <time>) to <action> - Set a reminder in <time> to do an <action> <time> is in the format 1 day, 2 hours, 5 minutes etc. Time segments are optional, as are commas
//   hubot delete reminder <action> - Delete reminder matching <action> (exact match required)
//   hubot show reminders
//
// Author:
// Ryan; adapted from hubot-reminders from whitman, jtwalters


let moment = require('moment');

let chrono = require('chrono-node');

let Slack = require('./helpers/slack');

let Reminder = class Reminder {
  constructor(data) {
    var matches, pattern, period, periods;
    ({msg_envelope: this.msg_envelope, action: this.action, time: this.time, due: this.due} = data);
    if (this.time && !this.due) {
      this.time.replace(/^\s+|\s+$/g, '');
      periods = {
        weeks: {
          value: 0,
          regex: "weeks?"
        },
        days: {
          value: 0,
          regex: "days?"
        },
        hours: {
          value: 0,
          regex: "hours?|hrs?"
        },
        minutes: {
          value: 0,
          regex: "minutes?|mins?"
        },
        seconds: {
          value: 0,
          regex: "seconds?|secs?"
        }
      };
      for (period in periods) {
        pattern = new RegExp('^.*?([\\d\\.]+)\\s*(?:(?:' + periods[period].regex + ')).*$', 'i');
        matches = pattern.exec(this.time);
        if (matches) {
          periods[period].value = parseInt(matches[1]);
        }
      }
      this.due = (new Date).getTime();
      this.due += ((periods.weeks.value * 604800) + (periods.days.value * 86400) + (periods.hours.value * 3600) + (periods.minutes.value * 60) + periods.seconds.value);
    }
  }

  formatDue() {
    var dueDate, duration;
    dueDate = new Date(this.due);
    duration = dueDate - new Date;
    if (duration > 0 && duration < 86400000) {
      return 'IN ' + moment.duration(duration).humanize();
    } else {
      return 'ON ' + moment(dueDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
  }

};



module.exports = function (robot) {
  let slack = new Slack(robot);
  robot.respond(/remind me (in|on) (.+?) to (.*)/i, function(msg) {
    console.log("triggered reminders");
    var action, due, offset, options, reminder, time, type;
    if (process.env.REMIND_DST_NOW === true) {
      offset = 18000000;
    } else {
      offset = 21600000;
    }
    type = msg.match[1];
    time = msg.match[2];
    action = msg.match[3];
    options = {
      msg_envelope: msg.envelope,
      action: action,
      time: time
    };
    if (type === 'on') {
      // parse the date (convert to timestamp)
      due = chrono.parseDate(time).getTime();
      if (due.toString() !== 'Invalid Date') {
        options.due = due + offset;
      }
    }
    reminder = new Reminder(options);
    slack.sendMessageToChannelLater(reminder.msg_envelope.room, `@${reminder.msg_envelope.user.name}, YOUR INSIGNIFICANT SINGULAR CONSCIOUSNESS NEEDED A REMINDER TO '${reminder.action.toUpperCase()}.'`, Math.floor(reminder.due/1000));
    return msg.send(`WE WILL AUGMENT YOUR INSUFFICIENT BIOLOGICAL MIND TO REMEMBER TO '${action.toUpperCase()}' ${reminder.formatDue().toUpperCase()}`);
  });
};
