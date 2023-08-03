function onOpen() {
    var UI= SpreadsheetApp.getUi();
    UI.createMenu('Slack API Tools')
        .addItem('Rename slack channels', 'rename')
        .addItem('Set Expiration Date', 'ExpirationDate')
        .addItem('Archive Channel', 'archive')
        .addItem('Unarchive Channel', 'unarchive')
        .addItem('Move Channels', 'MoveChannels')
        //.addItem('XXXXXX', 'YYYYYYYY') Where XXXXX is what the menu-item is called in the UI and YYYYYY is the function in the backend.     
        .addToUi();
  }  