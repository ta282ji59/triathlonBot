function tomorrow() {
  const menu = about_menu();
  const config = about_config();

  var day_count = 1;
  var tomorrow = [];
  var menu_tomorrow = [];
  while (day_count != 3) {
    if (day_count == 2 && (menu[day_count - 1].date != menu[day_count].date)) {
      break;
    }


    var event = menu[day_count].event;

    if ((menu[day_count].event).includes("ラン") || (menu[day_count].event).includes("バイク") || (menu[day_count].event).includes("スイム")) {
      event = (menu[day_count].event + "練");
    }

    tomorrow[day_count - 1] = "明日の活動について連絡をします。<br>明日は" + event + "です。<br>"
    var place = menu[day_count].place;
    var people = "";
    var bikeAddMessage = "";
    if (menu[day_count].event.includes("ラン")) {
      tomorrow[day_count - 1] += config.runMessage;
      tomorrow[day_count - 1] += "<br>"
    }
    else if (menu[day_count].event.includes("バイク")) {
      tomorrow[day_count - 1] += config.bikeMessage;
      tomorrow[day_count - 1] += "<br>"

      people += "以下バイク練の参加者です<br>選手: ";
      var formName;
      for (let i = 1; i < menu.length; i++) {
        if (menu[i].event == "バイク") {
          formName = menu[i].date;
          break;
        }

      }
      const sh = sheet(formName);
      var dataRange = sh.getDataRange();
      var data = dataRange.getValues();
      var bikeMember = [];
      var manageMember = [];
      var bikeMember_Count = 0, manageMember_Count = 0;
      for (let z = 1; z < data.length; z++) {
        if (data[z][2] == "選手") {
          bikeMember[bikeMember_Count] = data[z][1];
          people += (bikeMember[bikeMember_Count++] + "<br>");
        }
        else if (data[z][2] == "マネージャー") {
          manageMember[manageMember_Count++] = data[i][1];
        }
      }
      people += "<br>マネージャー: <br>";
      for (let z = 0; z < manageMember.length; z++) {
        people += (manageMember[z] + "<br>");
      }
      people += "<br>";


      place = config.bikePlace;
      bikeAddMessage = "<br>行き先 :" + menu[day_count].place;
      bikeAddMessage += "<br>";
    }
    menu_tomorrow[day_count - 1] += (menu[day_count].addComent + "<br>");
    menu_tomorrow[day_count - 1] = "以下詳細です<br>" + people + "<br>--------------------------<br>種目: " + menu[day_count].event + "<br>メイン: <a href='" + config.dayMenuLink + "'>" + menu[day_count].detail + "</a><br>集合時間: " + menu[day_count].time + "<br>集合場所: " + place + bikeAddMessage + "<br>--------------------------<br><br>"

    day_count++;
  }


  return {
    tomorrow,
    menu_tomorrow
  }
}

function followingWeek() {
  const menu = about_menu();
  const config = about_config();
  var message_followingWeek = "来週の活動について連絡します。<br>"
  var menu_followingWeek = "以下詳細です<br><br>--------------------------<br>"
  var addNumber = 0;
  for (let i = 1; i < (8 + addNumber); i++) {
    if (i >= 2) {
      if (menu[i].date == menu[i - 1].date) { addNumber++; }
    }
    menu_followingWeek += (menu[i].date + "(" + menu[i].day + "): " + menu[i].event + "[" + menu[i].detail + "]<br>");
  }
  menu_followingWeek += "--------------------------<br>";
  menu_followingWeek += "→<a href='" + config.dayMenuLink + "'>" + "練習メニューの詳細を見る" + "</a><br><br>"

  return {
    message_followingWeek,
    menu_followingWeek
  }
}


function bikeattendCheck() {

  var message_bikeCheck = "次回のバイク練について連絡します。<br>"
  var message_bikeDetail = bikemessage_detail().mess;
  Logger.log(message_bikeDetail)
  var bikeLink = "<br><a href='" + formCreate().formUrl + "'>" + "バイクフォームを開く" + "</a><br>"

  return {
    message_bikeCheck,
    message_bikeDetail,
    bikeLink
  }
}

function bikemessage_detail() {
  const menu = about_menu();
  const config = about_config();
  var triger_i = 0;
  for (let i = 0; i < menu.length; i++) {
    if ((menu[i].event).includes("バイク")) {
      triger_i = i;
      break;
    }
  }
  var mess = menu[triger_i].date + "のバイク練は" + menu[triger_i].place + "に行きます。参加する方は" + menu[triger_i].date + "の" + menu[triger_i].time + "に" + config.bikePlace + "に集合してください。それに伴い、選手とマネージャーの出欠確認をいたします。返信期限は" + menu[triger_i - 1].date + "の" + config.bikeFormDead + "です。参加する方は以下の返信フォームに従って返信して下さい。"

  return { mess };
}

function remind() {
  const menu = about_menu();
  var memo = "トライアスロン部パートリーダー及び、メールbot管理者に連絡します。<br>来週の練習メニューのスプレッドシートに記入漏れが一部あるので連絡いたします。<br>";
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  var count = 7;
  for (let i = 0; i < weekdays.length; i++) {
    if (menu[1].day == weekdays[i]) {
      count -= (i - 1);
      break;
    }
  }

  for (let i = 1; i < 10; i++) {
    if (menu[i].date == menu[i - 1].date) { count++; }
  }

  var missCount = 0;
  for (let i = 1; i <= count; i++) {
    if (menu[i].event == "休み") continue;
    memo += ("・" + menu[i].date + "(" + menu[i].day + ")" + "(" + menu[i].event + ")<br>");
    if (menu[i].detail == "未定") {
      memo += "→detail列が未定になっています。<br>"
      missCount++;
    }
    else if (menu[i].time == "00:00") {
      memo += "→time列が00:00になっています。<br>"
      missCount++;
    }
    else if (menu[i].event == null || menu[i].detail == null || menu[i].time == null || menu[i].place == null) {
      memo += "→最終列以外のどこかがまだ記入されていません。<br>"
      missCount++;
    }
    else {
      memo += "→問題なし<br>"
    }
  }
  memo += "他にも間違っている内容がある可能性があるのでパートリーダー・サブパートリーダーはしっかりと確認してください。<br>"

  return {
    memo,
    missCount
  }
}

function remindNextWeek() {
  const menu = about_menu();
  var memo = "";
  var triger_i = 0;
  for (let i = 4; i < 15; i++) {
    if (menu[i].event == menu[i - 1].event) {
      triger_i++;
    }
  }
  for (let i = 3; i < (10 + triger_i); i++) {
    memo += (menu[i].date + "(" + menu[i].day + "): " + menu[i].event + "[" + menu[i].detail + "]<br>");
  }
  memo += "<br>";
  memo += "未記入のメニュー(特に「未定」と記入されているもの)がありましたら<strong style='color:red;'>" + menu[1].date + "(" + menu[1].day + ")</strong>までに記入お願いします。";
  Logger.log(memo)
  return memo;
}

function rangeDay(){
  var today = new Date();
  var thirdDay = new Date(today);
  thirdDay.setDate(today.getDate()+2);//明日の練習メニュー関連で使用
  var nextWeekDay = new Date(today);
  nextWeekDay.setDate(today.getDate()+8);//１週間のメニュー表示で使用
  
  thirdDay = Utilities.formatDate(thirdDay, 'Asia/Tokyo', 'yyyy-MM-dd');
  nextWeekDay = Utilities.formatDate(nextWeekDay, 'Asia/Tokyo', 'yyyy-MM-dd');
  
  Logger.log(thirdDay)
  Logger.log(nextWeekDay)
  return {thirdDay,nextWeekDay}

}