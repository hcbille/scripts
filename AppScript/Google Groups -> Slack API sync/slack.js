function getUserID(mail) {
    var url = "https://slack.com/api/users.lookupByEmail";
    var options = {
      "method": "post",
      "headers": {
          "Authorization": "Bearer " + token,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      "payload": {
          email: mail
      }
    };
    //console.log(options);
    var response = UrlFetchApp.fetch(url, options);
    var UserID = JSON.parse(response.getContentText()).user.id;
    //console.log(UserID);
    return UserID;
}



function updateSlackGroup(group, members) {
    var url = "https://slack.com/api/usergroups.users.update";
    var options = {
      "method": "post",
      "headers": {
          "Authorization": "Bearer " + token,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      "payload": {
          usergroup: group,
          users: members
      }
    };
    //console.log(options);
    var response = UrlFetchApp.fetch(url, options);
}