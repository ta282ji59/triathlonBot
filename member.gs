function about_member() {
  const sheet_member = sheet('members')
  var dataRange = sheet_member.getDataRange();
  var data = dataRange.getValues();
  var members_list = [];

  for (let i = 1; i < data.length; i++) {
    members_list[i-1] = {
      varName: data[i][0],
      name: data[i][1],
      grade: data[i][2],
      position: data[i][3],
      address: data[i][4],
      belongs: data[i][5]
    };
  }
  return members_list;
}
