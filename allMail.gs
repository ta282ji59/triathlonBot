function officer() {
  const member = about_member();
  var mailto = "";
  for (var i = 0; i < member.length; i++) {
    mailto += member[i].address;
    if (i < member.length - 1) {
      mailto += ",";
    }
  }
  return mailto;
}

//明日が休みでなければ毎日
function dailyMail() {
  const config = about_config();
  const menu = about_menu();
  var body="";
  if (menu[1].event != "休み") {
    const textData = message("tomorrow");
    for(let i=0;i<textData.text_A.length;i++){
      if(textData.text_A.length>=2)body+=("<strong style='color:red;'>"+(i+1)+"種目目</strong><br>")
      body+=textData.text_A[i];
      body+=textData.text_B[i];
    }
    MailApp.sendEmail({
      to: config.sendMember,
      subject: (config.title + config.nextdayTitle),
      htmlBody: (body+textData.lastMessage)
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
  if ((menu[3].event).includes("バイク")) {
    const textData = message("nextBike");
    MailApp.sendEmail({
      to: config.sendMember,
      subject: (config.title + config.nextBikeTitle),
      htmlBody: (textData.text_A + textData.text_B + textData.text_C + textData.lastMessage)
    });
  }
}

//毎週金曜日
function remindWeeklyMail() {
  const config = about_config();
  const textData = message("remindNextWeek");
  const mailto = officer()
  MailApp.sendEmail({
    to: "ta282ji@icloud.com",
    subject: (config.title + config.remindWeekTitle),
    htmlBody: (textData.text_A)
  });
}

//毎日(朝夕)
function remindMail() {
  const config = about_config();
  const textData = message("remind");
  if (textData.text_B > 0) {
    const mailto = officer()
    MailApp.sendEmail({
      to: mailto,
      subject: (config.title + config.emptyWeekMenu),
      htmlBody: (textData.text_A)
    });
  }
}
