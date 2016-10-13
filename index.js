/**
 * Created by APC on 10/13/2016.
 */
var firebase = require("firebase");
firebase.initializeApp({
    serviceAccount: "FriendChat-c9590ad56875.json",
    databaseURL: "https://friendchat-260ce.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("message");

// ref.push({
//     name:"tuan",
//     email:"degea9@gmail.com"
// })
//
// ref.push({
//     name:"truong",
//     email:"truong@gmail.com"
// })



ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

ref.on("child_changed", function(snapshot) {
    var message = snapshot.val();
    console.log("The updated message is " + message.message);
});

ref.on("child_added",function (snapshot) {
    var message = snapshot.val();
    console.log("The new message  " + message.message);
})
