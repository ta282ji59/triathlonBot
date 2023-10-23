function tomorrow() {
  const menu = about_menu();
  const config = about_config();

  var event = menu[0].event;
  if (["ラン", "バイク", "スイム"].some(keyword => menu[0].event.toLowerCase().includes(keyword.toLowerCase()))) {
    event = (menu[0].event + "練");
  }

  var tomorrow = "明日の活動について連絡をします。<br>明日は" + event + "です。<br>"
  var place = menu[0].place;
  var people = "";
  var bikeAddMessage = "";
  if (menu[0].event.includes("ラン")) {
    tomorrow += config.runMessage;
    tomorrow += "<br>"
  }
  else if (menu[0].event.includes("バイク")) {
    tomorrow += config.bikeMessage;
    tomorrow += "<br>"

    people += "以下バイク練の参加者です<br>選手: ";
    const sh = sheet(menu[2].date);
    var dataRange = sh.getDataRange();
    var data = dataRange.getValues();
    var bikeMember = [];
    var manageMember = [];
    var bikeMember_Count = 0, manageMember_Count = 0;
    for (let i = 1; i < data.length; i++) {
      if (data[i][2] == "選手") {
        bikeMember[bikeMember_Count] = data[i][1];
        people += (bikeMember[bikeMember_Count++] + "<br>");
      }
      else if (data[0][2] == "マネージャー") {
        manageMember[manageMember_Count++] = data[i][1];
      }
    }
    people += "<br>マネージャー: <br>";
    for (let i = 0; i < manageMember.length; i++) {
      people += (manageMember[i] + "<br>");
    }
    people += "<br>";


    place = config.bikePlace;
    bikeAddMessage = "<br>行き先 :" + menu[0].place;
    bikeAddMessage += "<br>";
  }
  var menu_tomorrow = "以下詳細です<br>" + people + "<br>--------------------------<br>種目: " + menu[0].event + "<br>メイン: " + menu[0].detail + "<br>集合時間: " + menu[0].time + "<br>集合場所: " + place + bikeAddMessage + "<br>--------------------------<br><br>"

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
  for (let i = 0; i < 7; i++) {
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
  // var bikeLink = "<br><a href='" + formCreate().formUrl + "'>" + "バイクフォームを開く" + "</a><br>"

  return {
    message_bikeCheck,
    message_bikeDetail,
    bikeLink
  }
}

function bikemessage_detail(){
  const menu = about_menu();
  const config = about_config();
  var mess = menu[2].date + "のバイク練は" + menu[2].place + "に行きます。参加する方は" + menu[2].date + "の" + menu[2].time + "に" + config.bikePlace + "に集合してください。それに伴い、選手とマネージャーの出欠確認をいたします。返信期限は" + menu[1].date + "の" + config.bikeFormDead + "です。参加する方は以下の返信フォームに従って返信して下さい。"

  return {mess};
}

function remind() {
  const menu = about_menu();
  var memo = "トライアスロン部パートリーダー及び、メールbot管理者に連絡します。<br>来週の練習メニューのスプレッドシートに記入漏れが一部あるので連絡いたします。<br>";
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  var count = 7;
  for (let i = 0; i < weekdays.length; i++) {
    if (menu[0].day == weekdays[i]) {
      count -= (i - 1);
      break;
    }
  }
  var missCount = 0;
  for (let i = 0; i < count; i++) {
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
    else if (menu[i].event == "" || menu[i].detail == "" || menu[i].time == "" || menu[i].place) {
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
  for (let i = 2; i < 9; i++) {
    memo += (menu[i].date + "(" + menu[i].day + "): " + menu[i].event + "[" + menu[i].detail + "]<br>");
  }
  memo += "<br>";
  memo += "未記入のメニュー(特に「未定」と記入されているもの)がありましたら<strong style='color:red;'>" + menu[1].date + "(" + menu[1].day + ")</strong>までに記入お願いします。";

  return memo;
}
