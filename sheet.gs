function sheet(sheetTitle) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetTitle);
  return sheet;
}