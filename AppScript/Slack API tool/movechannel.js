function MoveChannels() {
    var url = "https://slack.com/api/admin.conversations.bulkMove"; // Tier 2 API, 20 requests per minute
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MoveChannels");
    var Rows = ss.getLastRow();

    var channel_idsV = ss.getRange("A2:A"+Rows).getValues().join(); 
    var target_team_idV= ss.getRange("B2").getValue();
    var options = {
        "method": "get",
        "headers": {
            "Authorization": "Bearer " + ss.getRange("Options!B4").getValue(),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        "payload" : { 
            "channel_ids": channel_idsV,
            "target_team_id": target_team_idV
    }}
    console.log(options.payload);
    var response = UrlFetchApp.fetch(url, options);
    console.log(response.getContentText());
}
