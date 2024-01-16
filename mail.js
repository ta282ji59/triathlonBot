/*　明日の練習メニュー */
function everyDayMail() {
  var message = tomorrow_detail();
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0, 10);
  var checkEvent;
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].date == tomorrow) {
      checkEvent = menu[i].event;
      break
    }
  }
  
  if (checkEvent != "休み") {
    MailApp.sendEmail({
      to: config.sendMember,
      subject: (config.title + config.nextdayTitle),
      htmlBody: message
    });
  }
}

function weeklyMail() {
  var message = nextWeek_detail();
  MailApp.sendEmail({
    to: config.sendMember,
    subject: (config.title + config.nextweekTitle),
    htmlBody: message
  });
}

function remindDailyMail() {
  var message = remind_daily_detail().message;
  var mem = officer()
  if (remind_daily_detail().checkCount > 0) {
    MailApp.sendEmail({
      to: mem,
      subject: (config.title + config.emptyWeekMenu),
      htmlBody: message
    });
  }
}

function remindWeeklyMail() {
  var message = remind_weekly_detail();
  var mem = officer()
  MailApp.sendEmail({
    to: mem,
    subject: (config.title + config.remindWeekTitle),
    htmlBody: message
  });
}

function bikeMail() {
  var threeDays = new Date();
  threeDays.setDate(threeDays.getDate() + 3);
  threeDays = threeDays.toISOString().slice(0, 10);
  var checkEvent = "";
  for (let i = 1; i < menu.length; i++) {
    if(menu[0].date==menu[i].date) continue;
    if (menu[i].date == threeDays && menu[i].event == "バイク") {
      checkEvent = menu[i].event;
      break;
    }
  }
  if (checkEvent == "バイク") {
    var message = bikemessage_detail()
    MailApp.sendEmail({
      to: config.sendMember,
      subject: (config.title + config.nextBikeTitle),
      htmlBody: message
    });
  }
  else{
    Logger.log(1)
  }
}
