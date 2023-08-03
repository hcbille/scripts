function onOpen() {
    var UI= SpreadsheetApp.getUi();
    UI.createMenu('Import from Calendar')
        .addItem('Import from Calendar', 'create_sheet')
        .addToUi();
  }
  
  function create_sheet(){
    var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var id_cal = ss.getRange('D2').getValue();
    var cal= CalendarApp.getCalendarById(id_cal);
    var start_time = new Date(ss.getRange('A2').getValue());
    var end_time  = new Date (ss.getRange('B2').getValue());
    var events = cal.getEvents(start_time,end_time);
    Logger.log(events.length);
      for(var i = 0;i<events.length;i++){
        var guestEmail = "";
        var title = events[i].getTitle();
        var start_time = events[i].getStartTime();
        var end_time = events[i].getEndTime();
        var des = events[i].getDescription();
        var guests = events[i].getGuestList(true);
        if (guests [0]){
          for (var j=0; j<guests.length; j++) {
            var guest = guests[j];
            var guestEmail =guestEmail +" "+ guest.getEmail();
          } 
      
    }  
  
        ss.getRange(i+5,1).setValue(title);
        ss.getRange(i+5,2).setValue(start_time);
        ss.getRange(i+5,3).setValue(end_time);
        ss.getRange(i+5,4).setValue(des);
        ss.getRange(i+5,5).setValue(guestEmail);
        ss
      }
  
  }
  
  // HC 2022