function unarchive() {
    var url = "https://slack.com/api/admin.conversations.unarchive"; // Tier 2 API, 20 requests per minute
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UnArchiveChannel");
    var Rows = ss.getLastRow();
    for(var i = 2;i<=Rows;i++){
      var idV= ss.getRange("A" + i).getValue();
      var options = {
        "method": "post",
        "headers": {
            "Authorization": "Bearer " + ss.getRange("Options!B4").getValue(),
            'Content-Type': 'application/json'
        },
        "payload": JSON.stringify({
            "channel_id": idV
        })
    };
    var response = UrlFetchApp.fetch(url, options);
    console.log(response.getContentText());
    Utilities.sleep(1000 * ss.getRange("Options!B6").getValue());
}}