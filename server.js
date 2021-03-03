const { response } = require("express");
var express = require("express");
var app = express();
var fs = require("fs");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile( __dirname + "/public/index.html");
});
app.get("/public/guestbook", function (req, res) {
    res.sendFile( __dirname + "/public/guestbook.html");

    
    var data = require("./data.json");
    let guestbook = "<table border='1' style='width:80%' >" +
                    "<tr><th>Message</th><th>Username</th><th>Country</th></tr>";

    for (let i = 0; i < data.length; i++) {
        guestbook += 
        "<tr><td>" + data[i].message + "</td>" +
        "<td>" + data[i].username + "</td>" + 
        "<td>" + data[i].country + "</td></tr>";
    };
    guestbook += "</table>";

    // res.send() automatically takes care of content-type and also ends the response
    res.send(guestbook);
    
});
app.get("/public/newmessage", function (req, res) {
    res.sendFile( __dirname + "/public/newmessage.html");

    const username = req.body.username;
    const country = req.body.country;
    const message = req.body.message ;

    console.log(username + country + message);
});
app.get("/public/ajaxmessage", function (req, res) {
    res.sendFile( __dirname + "/public/ajaxmessage.html");
});
app.get("*", function (req, res) {
    res.send("Can't find requested page");
});


app.listen(PORT);