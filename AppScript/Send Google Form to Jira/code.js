// Restrict the script's authorization
// to the form it is bound to.

//@OnlyCurrentDoc

// Create a form submit installable trigger
// using Apps Script.
function createFormSubmitTrigger() {

    // Get the form object.
    var form = FormApp.getActiveForm();
  
    // See if the trigger has already been set up.
    // Since we know this project should only have a single trigger
    // we'll simply check if there are more than 0 triggers. If yes,
    // we'll assume this function was already run so we won't create
    // a trigger.
    var currentTriggers = ScriptApp.getProjectTriggers();
    if(currentTriggers.length > 0)
      return;
    
    // Create a trigger that will run the onFormSubmit function
    // whenever the form is submitted.
    ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
  }
  
  // A function that is called by the form submit
  // trigger. The parameter e contains information
  // submitted by the user.
  function onFormSubmit(e) {
   
    // Get the response that was submitted.
    var formResponse = e.response;
    var submitter = e.response.getRespondentEmail();
    // Get the items (i.e., responses to various questions)
    // that were submitted.
    var itemResponses = formResponse.getItemResponses();
    // Create a variable emailBody to store the body
    // of the email notification to be sent.
    
  
    // Put together the email body by appending all the
    // questions & responses to the variable emailBody.
    itemResponses.forEach(function(itemResponse) {
      var title = itemResponse.getItem().getTitle();
      var response = itemResponse.getResponse();
      emailBody += title + "\n" + response + "\n\n";
    });
    var emailBody = "helloworld";
    send(emailBody);
  
  }
  
  function send(description) {
  
    var token = 'xxxxxXXXXxxxxxxXXxxxXXXxXXxxX';
    var url= 'https://site.atlassian.net/rest/api/3/issue';
    var options = {
      "method": "post",
      "headers": {
          "Authorization": "Basic " + Utilities.base64Encode("***USERNAME***:" + token),
          'Content-Type': 'application/json'
      },
      "payload": JSON.stringify({
        fields: {
          summary: 'Main order flow broken',
          issuetype: {
            id: '10002',
          },
          project: {
            id: '10130',
          },
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: description,
                    type: 'text',
                  },
                ],
              },
            ],
          },
          reporter: {
            id: '***USERID***',
          },
        },
      })
  }
    var response = UrlFetchApp.fetch(url, options);
  console.log(response);
  }