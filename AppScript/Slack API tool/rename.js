function rename() {
    var url = "https://slack.com/api/admin.conversations.rename"; // Tier 2 API, 20 requests per minute
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RenameChannels");
    var Rows = ss.getLastRow();
    for(var i = 2;i<=Rows;i++){
      var nameV = ss.getRange("B"+ i).getValue(); 
      var idV= ss.getRange("A" + i).getValue();
      var options = {
        "method": "post",
        "headers": {
            "Authorization": "Bearer " + ss.getRange("Options!B4").getValue(),
            'Content-Type': 'application/json'
        },
        "payload": JSON.stringify({
            "name": nameV,
            "channel_id": idV
        })
    };
    var response = UrlFetchApp.fetch(url, options);
    console.log(response.getContentText());
    Utilities.sleep(1000 * ss.getRange("Options!B6").getValue());
}}