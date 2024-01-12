function set_property() {
  PropertiesService.getScriptProperties().setProperty("API_KEY", "ak-7hymg-06htx-k5kbw-34zhf-91t57");
}

function scraping(target_url) {
  var options = {
    url: target_url,
    renderType: "HTML",
    outputAsJson: true
  };
  var pay_load = encodeURIComponent(JSON.stringify(options));
  const API_KEY = PropertiesService.getScriptProperties().getProperty("API_KEY");
  var api_url = "https://phantomjscloud.com/api/browser/v2/" + API_KEY + "/?request=" + pay_load;
  var response = UrlFetchApp.fetch(api_url).getContentText();
  var data = JSON.parse(response)["content"]["data"];

  return data;
}

//sheet.gs の関数とは無関係
function sheets(sheetTitle) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetTitle);
  return sheet;
}

function myFunction() {
  var url = 'https://web-ext.u-aizu.ac.jp/circles/triathlon/practice2.html';
  var html = scraping(url);

  var $ = Cheerio.load(html);
  var menuContent = $('#menu').html();

  var currentYear = new Date().getFullYear();

  $('h2').each(function() {
    var h2Text = $(this).text();
    if (h2Text.includes('月1日')) {
      var month = h2Text.match(/(\d+)月/)[1];
      var idValue = currentYear + '_' + month;
      $(this).attr('id', idValue);
    }
  });

  menuContent = $('#menu').html();
  var archiveSheet = sheet('archiveMenu');
  var lastRow = archiveSheet.getLastRow();
  var nextRow = lastRow + 1;

  archiveSheet.getRange(nextRow, 1).setValue(menuContent);
}
