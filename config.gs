function config() {
  const sheet_config = sheet('config')
  var dataRange = sheet_config.getDataRange();
  var data = dataRange.getValues();
  var config_sheet = {};

  for (var i = 0; i < data.length; i++) {
    var Name = data[i][0];
    var Value = data[i][1];
    // var Value = data[i].slice(1); // 2列目以降のデータを取得

    config_sheet[Name] = Value;
  }

  var runLeader =config_sheet['runLeader'];
  var swimLeader =config_sheet['swimLeader'];
  var bikeLeader =config_sheet['bikeLeader'];
  var sendMember = config_sheet['sendMember'];
  var title = config_sheet['Title'];
  var nextdayTitle = config_sheet['nextdayTitle'];
  var nextweekTitle = config_sheet['nextweekTitle'];
  var nextBikeTitle = config_sheet['nextBikeTitle'];
  var bikeFormDead = config_sheet['BikeFormDead'];
  var runMessage = config_sheet['RunMessage'];
  var bikeMessage = config_sheet['BikeMessage'];
  var dayMenuLink = config_sheet['DayMenuLink'];
  var emptyWeekMenu = config_sheet['emptyWeekMenu'];
  var remindWeekTitle = config_sheet['remindWeekTitle'];
  var bikePlace = config_sheet['bikePlace'];

  Logger.log(runLeader)
  Logger.log(swimLeader)
  Logger.log(bikeLeader)
  Logger.log(sendMember)
  Logger.log(title)
  Logger.log(nextdayTitle)
  Logger.log(nextweekTitle)
  Logger.log(nextBikeTitle)
  Logger.log(bikeFormDead)
  Logger.log(runMessage)
  Logger.log(bikeMessage)
  Logger.log(dayMenuLink)
  Logger.log(emptyWeekMenu)
  Logger.log(remindWeekTitle)
  Logger.log(bikePlace)
  
  return{
    runLeader,
    swimLeader,
    bikeLeader,
    sendMember,
    title,
    nextdayTitle,
    nextweekTitle,
    nextBikeTitle,
    bikeFormDead,
    runMessage,
    bikeMessage,
    dayMenuLink,
    emptyWeekMenu,
    remindWeekTitle,
    bikePlace
  } 
}
