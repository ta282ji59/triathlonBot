function about_config() {
  const sheet_config = sheet('config')
  var dataRange = sheet_config.getDataRange();
  var data = dataRange.getValues();
  var config_sheet = {};

  for (var i = 0; i < data.length; i++)config_sheet[data[i][0]] = data[i][1];

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


  return {
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

