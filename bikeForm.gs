function formCreate() {
  const menu = about_menu();
  var form = FormApp.create(menu[2].date);
  const description = bikemessage_detail().mess
  form.setDescription(description);

  var name = form.addTextItem()
    .setTitle("氏名")
    .setRequired(true);
  var checkBoxValidation = FormApp.createCheckboxValidation()
    .setHelpText("一つ選んでください")
    .requireSelectExactly(1)
    .build();
  var role = form.addCheckboxItem();
  role.setRequired(true)
    .setValidation(checkBoxValidation)
    .setTitle("参加方法")
    .setChoices([
      role.createChoice("選手"),
      role.createChoice("マネージャー")
    ]);
  
  var participantStyle = form.addCheckboxItem();
  participantStyle.setTitle("バイクの使用")
    .setChoices([
      participantStyle.createChoice("部のバイクで参加")
    ]);
  var car = form.addCheckboxItem();
  car.setTitle("車出し")
    .setChoices([
      car.createChoice("可能")
    ]);
  var remarks = form.addTextItem();
  remarks.setTitle("備考");
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  var formUrl = form.getPublishedUrl();
  return { formUrl };
}

function renameSheet(){
  const menu = about_menu();
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets=sheet.getSheets()
  for (var i = 0; i < sheets.length; i++) {
    var sheetName = sheets[i].getName();
    if (sheetName.includes("フォームの回答")) {
      sheets[i].setName(menu[3].date);
      break;
    }
  }
}

function deleteSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  for (var i = 0; i < sheets.length; i++) {
    var sheetName = sheets[i].getName();
    if (sheetName.includes("2")&&sheetName.includes("-")) {
      var formUrl = sheets[i].getFormUrl();
      if (formUrl) {
        var form = FormApp.openByUrl(formUrl);
        form.removeDestination();
      }
      spreadsheet.deleteSheet(sheets[i]);
      var fileData = DriveApp.getFilesByName(sheetName);
      var getData = fileData.next().setTrashed(true);
    }
  }
}