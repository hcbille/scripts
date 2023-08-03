function YYYYYYYYY() { //Function name, called from "Code"
    var url = "https://slack.com/api/admin.dummy_function"; //Tier 2 API, 20 requests per minute
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); //Set this to the sheet you want to be input.
    var Rows = ss.getLastRow();// This is to get a count of how many rows to process
    for(var i = 2;i<=Rows;i++){ //This iterates trough all rows beginning with row 2 to account for header row.
      var varA = ss.getRange("A"+ i).getValue(); // This takes the input from the current row. Add as many as needed for the API
      var varB= ss.getRange("B" + i).getValue();
      var options = {
        "method": "post",
        "headers": {
            "Authorization": "Bearer " + ss.getRange("Options!B4").getValue(), //Takes the API token from the Options sheet instead of hard-coding it
            'Content-Type': 'application/json'
        },
        "payload": JSON.stringify({
            "argumentA": varA,
            "argumentB": varB
        })
    };
    var response = UrlFetchApp.fetch(url, options);
    console.log(response.getResponseCode); // Outputs the response from the API to the log, to make it possible to verify
    Utilities.sleep(1000 * ss.getRange("Options!B6").getValue()); // Sleeps for the time set in Options. Sleep takes milliseconds as input, so we are doing times 1000 to get seconds.
    }
} 