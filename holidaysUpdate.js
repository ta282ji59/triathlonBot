function holiday() {
  const sheet_holidays = sheet('holidays');
  sheet_holidays.clear();  
  const range = sheet_holidays.getRange('A1');
  range.setValue('=IMPORTDATA("https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv")');
}
