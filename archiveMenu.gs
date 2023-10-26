//サイトの一部を定期的に抜きだす。
function archive() {
  const sh = sheet("menuStock");
  var dataRange = sh.getDataRange();
  var data = dataRange.getValues();
  const message = getFormHTML();

  data.push([message]);

  sh.getRange(data.length, 1, 1, data[0].length).setValues([[message]]);
}
