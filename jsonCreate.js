function readData() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1 = spreadsheet.getSheetByName('シート1');
  const all_data_range = sheet1.getDataRange();
  const all_data_values = all_data_range.getValues();

  // 日本のタイムゾーンを考慮した今日の日付を取得
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 今日の日付の開始時（午前0時）に設定
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7); // 1週間後の日付

  const filtered_data = all_data_values.filter(data_row => {
    if (!data_row[0] || !(data_row[0] instanceof Date)) {
      return false; // 日付でない行は除外
    }
    const row_date = new Date(data_row[0]);
    row_date.setHours(row_date.getHours() + 9); // UTC+9を適用
    return row_date >= today && row_date <= oneWeekLater;
  });

  const return_data = filtered_data.map(data_row => {
    return {
      date: data_row[0],
      day: data_row[1],
      event: data_row[2],
      detail: data_row[3],
      time: data_row[4],
      place: data_row[5],
      addMessage: data_row[7],
    }
  });
  
  return return_data;
}




function doGet() {
    const data = readData();
    const response = ContentService.createTextOutput();
    response.setMimeType(MimeType.JSON);
    response.setContent(JSON.stringify(data));
    return response;  
}
