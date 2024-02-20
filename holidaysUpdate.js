function holiday() {
  const sheet_holidays = sheet('holidays');
  sheet_holidays.clear();
  var response = UrlFetchApp.fetch("https://holidays-jp.github.io/api/v1/date.json");
  var holidays = JSON.parse(response.getContentText());
  
  var row = 2; // Start from the second row
  for (var date in holidays) {
    sheet_holidays.getRange(row, 1).setValue(new Date(date).toISOString().slice(0,10));
    sheet_holidays.getRange(row, 2).setValue(holidays[date]);
    row++;
  }
}
