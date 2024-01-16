function about_config() {
  /*
  🚨
  実際は使用するがローカル環境だとエラーの元なのでコメントアウト
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
  */

  var sendMember      = /*"u-aizutriathlon@googlegroups.com"*/""
  var title           = "[Triathlon]"
  var nextdayTitle    = "明日のメニュー"
  var nextweekTitle   = "今週の練習メニュー"
  var nextBikeTitle   = "次回のバイク練の出欠確認"
  var bikeFormDead    = "10:00"
  var runMessage      = "天候不利の場合はレイヤートレーニングをします"
  var bikeMessage     = "天候不利の場合はローラー練をします。"
  var dayMenuLink     = "http://web-ext.u-aizu.ac.jp/circles/triathlon/practice.html"
  var emptyWeekMenu   = "未記入の練習メニューについて報告"
  var remindWeekTitle = "来週の練習メニュー確認"
  var bikePlace       = "サークル棟"


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

