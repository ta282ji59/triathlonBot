//明日が休みでなければ毎日
function dailyMail() {
  const config = about_config();
  const menu = about_menu();
  if (menu[0].event!="休み") {
    const textData = message("tomorrow");
    MailApp.sendEmail({
      to: config.sendMember,
      subject: (config.title + config.nextdayTitle),
      htmlBody: (textData.text_A + textData.text_B + textData.lastMessage)
    });
  }

}

//毎週日曜日
function weeklyMail() {
  const config = about_config();
  const textData = message("nextWeek");
  MailApp.sendEmail({
    to: config.sendMember,
    subject: (config.title + config.nextweekTitle),
    htmlBody: (textData.text_A + textData.text_B + textData.lastMessage)
  });
}

//バイク練の3日前
function bikeMail() {
  const config = about_config();
  const menu = about_menu();
  if ((menu[2].event).include("バイク")) {
    const textData = message("nextBike");
    renameSheet()
    MailApp.sendEmail({
      to: config.sendMember,
      subject: (config.title + config.nextBikeTitle),
      htmlBody: (textData.text_A + textData.text_B + textData.text_C + textData.lastMessage)
    });
  }
}

//毎週金曜日
function remindWeeklyMail() {
  const textData = message("remindNextWeek");
  const member = about_member();
  var mailto="";
  for (var i = 0; i < member.length; i++) {
    mailto += member[i].address;
    if (i < member.length - 1) {
      mailto += ",";
    }
  }
  MailApp.sendEmail({
      to: mailto,
      subject: (config.title + config.remindNextWeek),
      htmlBody: (textData.text_A)
  });
}

//毎日(朝夕)
function remindMail() {
  const textData = message("remind");
  const member = about_member();
  var mailto="";
  for (var i = 0; i < member.length; i++) {
    mailto += member[i].address;
    if (i < member.length - 1) {
      mailto += ",";
    }
  }
  MailApp.sendEmail({
      to: mailto,
      subject: (config.title + config.emptyWeekMenu),
      htmlBody: (textData.text_A+textData.text_B)
  });
}
