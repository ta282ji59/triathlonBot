function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('archiveMenu');
  const data = sheet.getRange('A2:A' + sheet.getLastRow()).getValues();
  const nonEmptyData = data.filter(row => row[0] !== "");

  const template = HtmlService.createTemplateFromFile('index');
  template.menuData = nonEmptyData;
  return template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
