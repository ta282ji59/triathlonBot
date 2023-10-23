function message(title) {
  const menu = about_menu();
  const member = about_member();

  const tomorrowData = tomorrow();
  const followingWeekData = followingWeek();
  const remindData = remind();
  const remindNextWeekData = remindNextWeek();
  

  var triger_number=0;
  for(let i=0;i<member.length;i++){
    if((member[i].position).includes("競技部長")&&title=="nextWeek"){
      triger_number=i;
      break;
    }
    else if((member[i].position).includes(menu[0].event)){
      triger_number=i;
      break;
    }
  }
  var lastMessage = "以上です。<br>何か質問等がありましたら私まで連絡してください。<br><br>--------------------------<br>"+member[triger_number].belongs + "<br>" + member[triger_number].grade + " " + member[triger_number].name + "<br>email: " + member[triger_number].address + "<br>--------------------------<br><br>";
  
  var text_A="",text_B="",text_C="";
  if (title === "tomorrow") {
    text_A=tomorrowData.tomorrow;
    text_B=tomorrowData.menu_tomorrow
    return {
      text_A,
      text_B,
      lastMessage
    };
  } 
  else if (title === "nextWeek") {
    text_A=followingWeekData.message_followingWeek
    text_B=followingWeekData.menu_followingWeek;
    return {
      text_A,
      text_B,
      lastMessage
    };
  }
  else if (title === "remind") {
    text_A=remindData.memo;
    text_B=remindData.missCount
    return{
      text_A,
      text_B
    };
  } 
  else if (title === "remindNextWeek") {
    text_A=remindNextWeekData.memo;
    return{
      text_A
    };
  } 
  else if (title === "nextBike") {
    const bikeattendCheckData = bikeattendCheck();
    text_A=bikeattendCheckData.message_bikeCheck
    text_B=bikeattendCheckData.message_bikeDetail
    text_C=bikeattendCheckData.bikeLink
    return {
      text_A,
      text_B,
      text_C,
      lastMessage
    };
  }
}
