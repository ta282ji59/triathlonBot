function doGet(e) {
  const template = HtmlService.createTemplateFromFile('index');
  // template.deployURL = ScriptApp.getService().getUrl();
  template.formHTML = getFormHTML();
  const htmlOutput = template.evaluate();
  return htmlOutput;
}

function getFormHTML() {
  const menu = about_menu();
  const run = sheet('ラン練');
  var dataRange = run.getDataRange();
  var run_data = dataRange.getValues();
  const swim = sheet('スイム練');
  var dataRange = swim.getDataRange();
  var swim_data = dataRange.getValues();

  let html = '';

  for (let i = 0; i < 7; i++) {
    var twoComment=""
    if(i>0){
      if(menu[i-1].date==menu[i].date){twoComment="(2回目)"}
    }
    html += `<h3 style="display: inline-block;padding: 0.4em 1.0em;font-family: 'Noto Serif JP serif',color: #494949;background: #f4f4f4;border-left: solid 5px grey;border-right: solid 5px grey;border-bottom: solid 3px #d7d7d7;margin-bottom: 5px;">${menu[i].date}(${menu[i].day})${menu[i].event}${twoComment}</h3>`;
    var loop_count=1;
    if (menu[i].event != "休み" && menu[i].event != "イベント") {
      var place;
      if((menu[i].event).includes("バイク"))place=="サークル棟";
      else place=menu[i].place
      html += `<strong><p>------------------<br>集合場所: ${place}</p><p>集合時間: ${menu[i].time}<br>------------------</p></strong>`;
      if ((menu[i].event).includes("ラン")) {
        if (menu[i].detail == "未定" || menu[i].detail == "") {
          html += `<strong><pre>準備中</pre></strong>`;
        }
        else {
          for (let j = 0; j <= (run_data[0].length+1); j++) {
            if (menu[i].detail == run_data[0][j]) {
              if ((menu[i].place).includes("サークル棟")) {
                html += `<strong><pre>${run_data[1][j]}</pre></strong>`;
              }
              else{
                html += `<strong><pre>${run_data[2][j]}</pre></strong>`;
              }
            }
          }
        }
      }
      if ((menu[i].event).includes("スイム")) {
        if (menu[i].detail == "未定" || menu[i].detail == "") {
          html += `<strong><pre>準備中</pre></strong>`;
        }
        else {
          for (let j = 0; j <= (swim_data[0].length+1); j++) {
            if (menu[i].detail == swim_data[0][j]) {
              html += `<strong><pre>${swim_data[1][j]}</pre></strong>`;
            }
          }
        }
      }
      if ((menu[i].event).includes("バイク")) {
        if (menu[i].place == "未定" || menu[i].place == "") {
          html += `<strong><pre>準備中</pre></strong>`;
        }
        html += `<strong><pre>${menu[i].place}に行きます。</pre></strong>`;
      }

    }
    else if (menu[i].event == "休み") {
      html += `
      <strong><pre>お休みです。</pre></strong>
      `;
    }
    else if (menu[i].event == "イベント") {
      html += `
      <strong><pre>イベント日(${menu[i].detail})です。</pre></strong>
      `;
    }
  }



  return html;
}