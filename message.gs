function message(title){
  const menu = about_menu();
  const member = about_member();
  const config = about_config();

  if(menu[0].event!="イベント")menu[0].event=(menu[0].event+"練")
  var tomorrow = "明日の活動について連絡をします。<br>明日は"+menu[0].event+"です。<br>"
  var place = menu[0].place;
  var bikeAddMessage=""
  if(menu[0].event.includes("ラン")){
    tomorrow+=config.runMessage;
    tomorrow+="<br>"
  }
  else if(menu[0].event.includes("バイク")){
    tomorrow+=config.bikeMessage;
    tomorrow+="<br>"

    place = config.bikePlace;
    bikeAddMessage="<br>行き先 :"+menu[0].place;
  }

  var message_nextWeek = "来週の活動について連絡します。<br>"

  var next_detail = "以下詳細です<br>--------------------------<br>";

  
  var menu_tomorrow = "種目: " + menu[0].event + "<br>メイン: " + menu[0].detail + "<br>集合時間: " + menu[0].time + "<br>集合場所" + place + bikeAddMessage + "<br>--------------------------<br>"

  // ここにバイクのスプレッドシートの結果を読み込む処理を追加する。

  var triger_number=0;
  for(let i=0;i<member.length;i++){
    if(member[i].position==menu[0].event){
      triger_number=i;
      break;
    }
  }
  var lastMessage = "以上です。<br>何か質問等がありましたら私まで連絡してください。<br><br>--------------------------<br>"+member[triger_number].belongs + "<br>" + member[triger_number].grade + " " + member[triger_number].name + "<br>email: " + member[triger_number].address + "<br>--------------------------<br><br>";

}