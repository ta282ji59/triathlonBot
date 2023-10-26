function hideSheet() {
  const menuSheet = sheet('menu');

  if (menuSheet) {
    const today = new Date(); // 今日の日付
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2); // 1日前の日付

    const data = menuSheet.getDataRange().getValues(); // シートのデータを取得
    const lastRow = menuSheet.getLastRow();
    for (let i = 1; i <= lastRow; i++) {
      const dateCellValue = new Date(data[i - 1][0]); // 日付のセルの値を取得（この例では1列目の日付）
      if (dateCellValue < yesterday) {
        menuSheet.hideRows(i); // 1日前よりも前の行を非表示にする
      }
    }
  } 
}
