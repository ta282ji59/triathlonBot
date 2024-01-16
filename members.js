function about_member() {
  const sheet_member = sheet('members')
  var dataRange = sheet_member.getDataRange();
  var data = dataRange.getValues();
  var members_list = [];

  for (let i = 1; i < data.length; i++) {
    members_list[i-1] = {
      name: data[i][0],
      grade: data[i][1],
      position: data[i][2],
      address: data[i][3],
      belongs: data[i][4]
    };
  }
  
  return members_list;
}
