function ExpirationDate() {
    var url = "https://slack.com/api/admin.users.setExpiration"; // Tier 2 API, 20 requests per minute
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ExpirationDate");
    var Rows = ss.getLastRow();
    for(var i = 2;i<=Rows;i++){
      var expiration_tsV = ss.getRange("C"+ i).getValue(); 
      var user_idV= ss.getRange("A" + i).getValue();
      var team_idV = ss.getRange("B" + i).getValue();
      var options = {
        "method": "post",
        "headers": {
            "Authorization": "Bearer " + ss.getRange("Options!B4").getValue(),
            'Content-Type': 'application/json'
        },
        "payload": JSON.stringify({
            "expiration_ts": expiration_tsV,
            "user_id": user_idV,
            "team_id": team_idV
        })
    };
    var response = UrlFetchApp.fetch(url, options);
    console.log(response.getResponseCode);
    Utilities.sleep(1000 * ss.getRange("Options!B6").getValue());
    }
} 