function myFunction() {
  const sheet_config = sheet('members')
  var dataRange = sheet_config.getDataRange();
  var data = dataRange.getValues();
  Logger.log(data)
}
