const config = about_config();
const member = about_member();
const menu = about_menu();

/*menuの月曜から日曜日を取得する関数 */
function oneWeek_menu() {
  var count_start = -1;
  var count_end = -1;
  // Logger.log(menu.length)
  for (var i = 0; i < menu.length; i++) {
    if (menu[i].day === "月" && count_start == -1) {
      count_start = i;
    }
    else if (menu[i].day === "日" && count_start !== -1) {
      count_end = i + 1;
    }
    if (count_start != -1 && count_end != -1) break;
  }
  Logger.log(count_start)
  Logger.log(count_end)
  if (count_start !== -1 && count_end !== -1) {
    return {
      count_start,
      count_end//<、<=はダメ
    }

  } else {
    Logger.log("Error");
  }
}

/*menuの明日のシート()を取得する関数 */
function tomorrow_menu() {
  var count_start = -1;
  var count_end = -1;

  var today = new Date();
  var daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  var tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  var tomorrowDayOfWeek = daysOfWeek[tomorrow.getDay()];

  for (var i = 0; i < menu.length; i++) {
    if (menu[i].day == tomorrowDayOfWeek && count_start == -1) {
      count_start = i;
    }
    else if (menu[i].day != tomorrowDayOfWeek && count_start != -1) {
      count_end = i;
      break;
    }
  }

  if (count_start !== -1 && count_end !== -1) {
    return {
      count_start,
      count_end//<、<=はダメ
    }

  } else {
    Logger.log("Error");
  }
}

/*誰が連絡の主体なのかを決める関数*/
function whosMail(mem_position) {
  var lastMessage = "以上です。<br>何か質問等がありましたら以下まで連絡してください。<br>"
  var mem_info;
  for (let i = 0; i < member.length; i++) {
    if ((member[i].position).includes(mem_position)) {
      mem_info = member[i];
    }
    else if (mem_position == "休み") {
      mem_info = member[0];
    }
  }
  lastMessage += "-------------------------<br>";
  lastMessage += (mem_info.belongs + "<br>");
  lastMessage += (mem_info.grade + " " + mem_info.name + "<br>");
  lastMessage += ("email: " + mem_info.address + "<br>");
  lastMessage += "-------------------------<br><br>";

  return lastMessage;
}

/*明日の練習メニューの内容を表示する関数*/
function tomorrow_detail() {
  const tm = tomorrow_menu();
  var message = "";
  var count = 1;
  for (let i = tm.count_start; i < tm.count_end; i++) {
    if (tm.count_end >= 3) {
      message += ("<strong style='color:red;'>" + count + "種目目</strong><br>");
      count++;
    }
    message += "明日の活動について連絡します。<br>明日は" + menu[i].event;
    if (menu[i].event == "ラン" || menu[i].event == "バイク" || menu[i].event == "スイム") {
      message += "練です。<br>";
    }
    else {
      message += "(" + menu[i].detail + ")です。<br>";
    }
    if (menu[i].event == "ラン") {
      message += config.runMessage
      message += "<br>"
    }
    else if (menu[i].event == "バイク") {
      message += config.bikeMessage
      message += "<br>"
      message += "以下は明日の参加者です。<br><br>"
      message += "選手:<br>"
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow = tomorrow.toISOString().slice(0, 10);
      const bikeSheet = sheet(tomorrow);
      var dataRange = bikeSheet.getDataRange();
      var data = dataRange.getValues();
      var manageMember = []
      var mCount = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i][2] == "選手") {
          message += (data[i][1] + "<br>")
        }
        else if (data[i][2] == "マネージャー") {
          manageMember[mCount++] = data[i][1]
        }
      }
      message += "<br>マネージャー:<br>"
      for (let i = 0; i < manageMember.length; i++) {
        message += (manageMember[i] + "<br>")
      }
    }
    message += "<br>"

    if (menu[i].event == "ラン" || menu[i].event == "スイム" || menu[i].event == "バイク") {
      var place = menu[i].place;
      if (menu[i].event == "バイク") {
        place = config.bikePlace;
      }
      message += (menu[i].addComent + "<br><br>");
      message += "以下詳細です。<br><br>"
      message += "-------------------------<br>"
      message += ("種目: " + menu[i].event + "<br>")

      message += ("メイン: <a href='" + config.dayMenuLink + "'>" + menu[i].detail + "</a><br>")
      message += ("集合時間: " + menu[i].time + "<br>")
      message += ("集合場所: " + place + "<br>")
      if (menu[i].event == "バイク") {
        message += ("行き先: " + menu[i].place + "<br>")
      }
      message += "-------------------------<br><br>"
    }

    else if (menu[i].event == "大会" || menu[i].event == "イベント") {
      message += "詳しい内容は別途送られているメール等でご確認ください。<br><br>"
    }

  }
  message += whosMail("競技部長")
  return message;
}



/*来週の練習メニューの内容を表示する関数*/
function nextWeek_detail() {
  const om = oneWeek_menu();
  var message = "今週の練習メニューについて連絡します。<br>今週のメニューは以下のようになっています。<br><br>";
  message += "-------------------------<br>"
  for (let i = om.count_start; i < om.count_end; i++) {
    message += (menu[i].date + "(" + menu[i].day + "): " + menu[i].event + "[" + menu[i].detail + "]<br>");
  }
  message += "-------------------------<br>"
  message += (" <a href='" + config.dayMenuLink + "'>練習メニューの詳細を見る。</a><br><br>");
  message += whosMail("競技部長");

  // Logger.log(message)
  return message;
}

/*リマインドメール内容を表示する関数*/
function remind_daily_detail() {
  var message = "パートリーダーに連絡します。<br>練習メニューのスプレッドシートに記入漏れが一部あるので連絡いたします。<br><br>";
  var checkCount = 0;

  message_table = "<table border='1' style='border-collapse: collapse'><tbody><tr><td>日にち</td><td>内容</td><td>エラー原因(1)</td>"
  message_sub = "";

  var mondayCount = 0;
  var rowErrorCount = 0;
  for (let i = 1; i < menu.length; i++) {
    let onceErrorCheck = 0;
    if (menu[0].date == menu[i].date) continue;//その日のメニューの内容を注意してももう遅いからスキップ

    if (menu[0].day == "金" || menu[0].day == "土" || menu[0].day == "日") {
      if (menu[i].day == "月" && menu[i].date != menu[i - 1].date) mondayCount++;
      if (mondayCount == 2) break;
    }
    else {
      if (menu[0].date != menu[i].date && menu[i].day == "月") break;
    }
    var missCount = 0;
    if (menu[i].event == "休み" || menu[i].event == "イベント" || menu[i].event == "大会") {
      message_sub += "<tr><td>" + menu[i].date + "(" + menu[i].day + ")</td>"
      message_sub += "<td>" + menu[i].event + "</td>"
      message_sub += "<td>問題なし</td></tr>"
    }
    else {
      message_sub += "<tr><td>" + menu[i].date + "(" + menu[i].day + ")</td>"
      message_sub += "<td>" + menu[i].event + "</td>"
      if (menu[i].event == "") { message_sub += "<td style='color: red;'>" + "C列目" + "</td>"; missCount++; checkCount++; onceErrorCheck++; }
      if (menu[i].detail == "" || menu[i].detail == "未定") { message_sub += "<td style='color: red;'>" + "D列目" + "</td>"; missCount++; checkCount++; onceErrorCheck++; }
      if (menu[i].time == "" || menu[i].time == "00:00") { message_sub += "<td style='color: red;'>" + "E列目" + "</td>"; missCount++; checkCount++; onceErrorCheck++; }
      if (menu[i].place == "" || menu[i].place == "未定") { message_sub += "<td style='color: red;'>" + "F列目" + "</td>"; missCount++; checkCount++; onceErrorCheck++; }
      if (missCount == 0) { message_sub += "<td>問題なし</td>" }
    }
    message_sub += "</tr>"
    if (onceErrorCheck > rowErrorCount) rowErrorCount = onceErrorCheck;
  }

  for (let i = 0; i < (rowErrorCount - 1); i++) {
    message_table += "<td>エラー原因(" + (i + 2) + ")</td>"
  }
  message_table += "</tr>"

  message_sub += "</tbody></table>"
  message += message_table;
  message += message_sub;
  console.log(message)
  return { message, checkCount };
}

/*リマインドメール内容を表示する関数*/
function remind_weekly_detail() {
  var deadline;
  for (let i = oneWeek_menu().count_start; i < oneWeek_menu().count_end; i++) {
    if (menu[i].day == "土") {
      deadline = ("<strong style='color:red;'>" + menu[i].date + "(" + menu[i].day + ")</strong>");
      break;
    }
  }
  var message = "来週の練習メニューで送信される内容は現在下記のようになっております。<br>未記入のメニュー(特に「未定」と記入されているもの)がありましたら" + deadline + "までに記入お願いします。<br><br><br>"
  message += nextWeek_detail();

  // Logger.log(message)
  return message;
}

function bikemessage_detail() {
  var threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  threeDaysLater = threeDaysLater.toISOString().slice(0, 10);
  var triger_i = 0;

  for (let i = 0; i < menu.length; i++) {
    if (menu[i].date == threeDaysLater && menu[i].event == "バイク") {
      triger_i = i;
      break;
    }
  }
  var message = menu[triger_i].date + "のバイク練は" + menu[triger_i].place + "に行きます。参加する方は" + menu[triger_i].date + "の" + menu[triger_i].time + "に" + config.bikePlace + "に集合してください。それに伴い、選手とマネージャーの出欠確認をいたします。返信期限は" + menu[triger_i - 1].date + "の" + config.bikeFormDead + "です。参加する方は以下の返信フォームに従って返信して下さい。"


  message += "<a href='" + formCreate() + "'>バイクフォームにアクセスする。</a><br><br>"

  message += whosMail("競技部長");

  return message;
}


/* リマインドメール系の送り相手 */
function officer() {
  var mailto = "";
  for (var i = 0; i < member.length; i++) {
    mailto += member[i].address;
    if (i < member.length - 1) {
      mailto += ",";
    }
  }
  return mailto;
}
