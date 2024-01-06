function about_menu() {
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
  var menu_list=[];
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
  }
  
  // Logger.log(menu_list);
  return menu_list;
}

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
