var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.sendFile( __dirname + "/public/index.html");
});
app.get("/public/guestbook", function (req, res) {
    res.sendFile( __dirname + "/public/guestbook.html");
});
app.get("/public/newmessage", function (req, res) {
    res.sendFile( __dirname + "/public/newmessage.html");
});
app.get("/public/ajaxmessage", function (req, res) {
    res.sendFile( __dirname + "/public/ajaxmessage.html");
});
app.get("*", function (req, res) {
    res.send("Can't find requested page");
});

app.listen(8081, function () {
    console.log("App listenin on port 8081!")
});