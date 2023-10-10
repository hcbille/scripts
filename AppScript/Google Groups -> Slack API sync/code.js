var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');

function processEachSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  // Loop through each sheet in the spreadsheet
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var sheetName = sheet.getName();
    
    // Your code to process the current sheet goes here
    // You can use the 'sheetName' variable as needed
    
    // Example: Log the sheet name
    //Logger.log("Processing sheet: " + sheetName);
    
    // Example: Perform some action on the current sheet
    // Replace this with your actual code
    // sheet.getRange("A1").setValue("Processed");
    getGroupMembers(sheetName);
  }
}



function getGroupMembers(sheetIn) {
  Logger.log("Processing group: " + sheetIn);
  // create empty array to push members details into
  var memberDetails = [];
  
  
  // get Google Group by email address
  try {
    var group = GroupsApp.getGroupByEmail(sheetIn);
  }
  catch(e) {
    // issues getting Google Group
    
    // set var to false to code does not continue
    var group = false;
  }
  
  
// check if getting Group was successful before proceeding
if (group) {

  // get array of all members in Google Group and length of the array
  var members = group.getUsers();
  var membersLength = members.length;

  // loop through members to get their Email Address & Role ******************
  for (var i = 0; i < membersLength; i++) {

    // get Email Address
    var memberEmailAddress = members[i].getEmail();
    //console.log(memberEmailAddress);
    var userID = getUserID(memberEmailAddress);
    //console.log = userID;

    // push details into array for later pasting into Google Sheet
    memberDetails.push([memberEmailAddress, userID]);

  }
  // loop through members to get their Email Address******************

  // paste collated details into Google Sheet ********************
  // get 'Group Members' sheet
  var groupMembersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetIn);

  // clear content in rows starting from the second row onwards
  var lastRow = groupMembersSheet.getLastRow();
  if (lastRow > 1) {
    groupMembersSheet.getRange(2, 1, lastRow - 1, 1).clearContent();
  }

  // paste in collated members' details from the array
  groupMembersSheet.getRange(2, 1, memberDetails.length, 2).setValues(memberDetails);
  // paste collated details into Google Sheet ********************
  var userids = groupMembersSheet.getRange("B2:B" + lastRow).getValues().join();
  updateSlackGroup(groupMembersSheet.getRange("A1").getValue().toString(),userids);
} else {
  // problem getting Google Group
}
}