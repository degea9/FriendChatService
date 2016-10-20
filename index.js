/**
 * Created by APC on 10/13/2016.
 */
var firebase = require("firebase");
var request = require('request');
var API_KEY = "AIzaSyCKMx6wRJOGRfvGtBswXBvIlzZx0jsxtYI"; 

firebase.initializeApp({
    serviceAccount: "FriendChat-c9590ad56875.json",
    databaseURL: "https://friendchat-260ce.firebaseio.com"
});

var db = firebase.database();
//var ref = db.ref("calls");

//var ref = firebase.database().ref();


function listenForNotificationRequests() {
  var requests = db.ref("calls");
  requests.on('child_added', function(requestSnapshot) {
    var request = requestSnapshot.val();
    sendNotificationToUser(
         request.callerId, 
      request.receiverId, 
      request.sessionId,
      function() {
          console.log("success");
        requests.child(requestSnapshot.getKey()).remove();
      }
    );
  }, function(error) {
    console.error(error);
  });
};

function sendNotificationToUser(callerId,receiverId, sessionId, onSuccess) {
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': 'key='+API_KEY
    },
    body: JSON.stringify({
      data:{
         callerId: callerId,
         sessionId: sessionId
      },
      to : '/topics/'+receiverId
    })
  }, function(error, response, body) {
    if (error) { console.error(error); }
    else if (response.statusCode >= 400) { 
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage); 
    }
    else {
      onSuccess();
    }
  });
}

// start listening
listenForNotificationRequests();
