function about_menu() {
  /*
  🚨
  実際は使用するがローカル環境だとエラーの元なのでコメントアウト
  const sheet_menu = sheet('menu');
  
  var dataRange = sheet_menu.getDataRange();
  var data = dataRange.getValues();
  
  let today_point=data.length;
  let today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
  for (let i = 1; i < data.length; i++) {
    data[i][0] = Utilities.formatDate(new Date(data[i][0]), 'Asia/Tokyo', 'yyyy-MM-dd');
    if (today == data[i][0]) {
      today_point = i;
    }
  }
  */

  var menu_list=[];
  /*
  🚨
  実際は使用するがローカル環境だとエラーの元なのでコメントアウト
  var setDay = rangeDay();
  var i=0;
  let new_i=today_point;
  
  while(data[new_i-1][0]!=setDay.nextWeekDay){
    menu_list[i] = {
      date: data[new_i][0],
      day: data[new_i][1],
      event: data[new_i][2],
      detail: data[new_i][3],
      time: data[new_i][4],
      place: data[new_i][5],
      addComent: data[new_i][6]
    };
    
    new_i++;
    i++;
  }*/

  menu_list =[
    { date:"2024-01-15",day:"月",event:"ラン練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-16",day:"火",event:"スイム練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-17",day:"水",event:"休み",detail:"rest",time:"00:00",place:"rest",addComment:""},
    { date:"2024-01-18",day:"木",event:"スイム練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-19",day:"金",event:"ラン練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-20",day:"土",event:"バイク練",detail:"雪だるま",time:"09:00",place:"ゴールドライン",addComment:""},
    { date:"2024-01-21",day:"日",event:"休み",detail:"rest",time:"00:00",place:"rest",addComment:""},
    { date:"2024-01-22",day:"月",event:"ラン練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-23",day:"火",event:"スイム練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-24",day:"水",event:"休み",detail:"rest",time:"00:00",place:"rest",addComment:""},
    { date:"2024-01-25",day:"木",event:"スイム練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-26",day:"金",event:"ラン練",detail:"ペース走",time:"09:00",place:"サークル棟",addComment:""},
    { date:"2024-01-27",day:"土",event:"バイク練",detail:"雪だるま",time:"09:00",place:"ゴールドライン",addComment:""},
    { date:"2024-01-28",day:"日",event:"休み",detail:"rest",time:"00:00",place:"rest",addComment:""},
  ]
  
  // Logger.log(menu_list);
  return menu_list;
}

/*
  🚨
  実際は使用するがローカル環境だとエラーの元なのでコメントアウト
function rangeDay(){
  var today = new Date();
  var tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);//明日の練習メニュー関連で使用
  var nextWeekDay = new Date(today);
  nextWeekDay.setDate(today.getDate()+9);//１週間のメニュー表示で使用
  
  tomorrow = Utilities.formatDate(tomorrow, 'Asia/Tokyo', 'yyyy-MM-dd');
  nextWeekDay = Utilities.formatDate(nextWeekDay, 'Asia/Tokyo', 'yyyy-MM-dd');
  
  // Logger.log(tomorrow)
  // Logger.log(nextWeekDay)
  return {tomorrow,nextWeekDay}

}
*/
