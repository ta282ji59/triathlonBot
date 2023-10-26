function about_menu() {
  const sheet_member = sheet('menu');
  var dataRange = sheet_member.getDataRange();
  var data = dataRange.getValues();
  
  let today_point=data.length;
  let today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
  for (let i = 1; i < data.length; i++) {
    data[i][0] = Utilities.formatDate(new Date(data[i][0]), 'Asia/Tokyo', 'yyyy-MM-dd');
    if (today == data[i][0]) {
      today_point = i;
    }
    if(i==(today_point+11))break;
  }

  var menu_list=[];
  for(let i=0; i<15; i++){
    let new_i=i+today_point;
    menu_list[i] = {
      date: data[new_i][0],
      day: data[new_i][1],
      event: data[new_i][2],
      detail: data[new_i][3],
      time: data[new_i][4],
      place: data[new_i][5],
      addComent: data[new_i][6]
    };
  }
  // Logger.log(menu_list[0].date)
  // Logger.log(menu_list[0].day)
  // Logger.log(menu_list[0].event)
  // Logger.log(menu_list[0].detail)
  // Logger.log(menu_list[0].time)
  // Logger.log(menu_list[0].place)
  // Logger.log(menu_list[0].addComent)
  return menu_list;
}
