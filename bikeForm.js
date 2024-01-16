function formCreate() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  // 8日前までの日付範囲
  var today = new Date();
  var minDaysAgo = new Date();
  minDaysAgo.setDate(today.getDate() - 1000);
  var maxDaysAgo = new Date();
  maxDaysAgo.setDate (today.getDate() - 8);

  // 8日前までの日付範囲内のシートを削除
  for (var i = 0; i < sheets.length; i++) {
    var sheetName = sheets[i].getName();
    var dateParts = sheetName.match(/(\d{4})-(\d{2})-(\d{2})/);

    if (dateParts) {
      var sheetDate = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);

      if (!isNaN(sheetDate) && (sheetDate <= maxDaysAgo || sheetDate >= minDaysAgo)) {
        var formUrl = sheets[i].getFormUrl();
        if (formUrl) {
          var form = FormApp.openByUrl(formUrl);
          form.removeDestination();
        }
        spreadsheet.deleteSheet(sheets[i]);
        var fileData = DriveApp.getFilesByName(sheetName);
        if (fileData.hasNext()) {
          fileData.next().setTrashed(true);
        }
      }
    }
  }

  // 3日後の日付を取得
  var threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  threeDaysLater = threeDaysLater.toISOString().slice(0, 10);

  var triger_i = 0;

  for (let i = 0; i < menu.length; i++) {
    if(menu[i].date === threeDaysLater && menu[i].event === "バイク") {
      triger_i = i;
      break;
    }
  }
  var description = menu[triger_i].date + "のバイク練は" + menu[triger_i].place + "に行きます。参加する方は" + menu[triger_i].date + "の" + menu[triger_i].time + "に" + config.bikePlace + "に集合してください。それに伴い、選手とマネージャーの出欠確認をいたします。返信期限は" + menu[triger_i - 1].date + "の" + config.bikeFormDead + "です。参加する方は以下の返信フォームに従って返信して下さい。"

  var form = FormApp.create(threeDaysLater);
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

   form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

   var formUrl = form.getPublishedUrl();

   renameSheet();
  
   return formUrl;
 }


 function renameSheet(){
   var sheet = SpreadsheetApp.getActiveSpreadsheet();
   SpreadsheetApp.flush()
   var sheets=sheet.getSheets()
   var threeDaysLater = new Date();
   threeDaysLater.setDate(threeDaysLater.getDate() + 3);
   threeDaysLater = threeDaysLater.toISOString().slice(0, 10);
   for (var i = 0; i < sheets.length; i++) {
     var sheetName = sheets[i].getName();
     if (sheetName.includes("フォームの回答")) {
       sheets[i].setName(threeDaysLater);
       break;
     }
   }
 }

 function deleteSheet() {
   var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
   var sheets = spreadsheet.getSheets();

   var today = new Date();
   var minDaysAgo = new Date();
   minDaysAgo.setDate(today.getDate() - 14); // 14日前の日付を計算
   var maxDaysAgo = new Date();
   maxDaysAgo.setDate(today.getDate() - 8); // 8日前の日付を計算

   for (var i = 0; i < sheets.length; i++) {
     var sheetName = sheets[i].getName();
    
     var dateParts = sheetName.match(/(\d{4})-(\d{2})-(\d{2})/);

     if (dateParts) {
       var sheetDate = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);
      
       if (!isNaN(sheetDate) && (sheetDate <= maxDaysAgo || sheetDate >= minDaysAgo)) {
         var formUrl = sheets[i].getFormUrl();
         if (formUrl) {
           var form = FormApp.openByUrl(formUrl);
           form.removeDestination();
         }
         spreadsheet.deleteSheet(sheets[i]);
         var fileData = DriveApp.getFilesByName(sheetName);
         if (fileData.hasNext()) {
           fileData.next().setTrashed(true);
         }
       }
     }
   }
}
