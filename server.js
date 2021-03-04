var express = require("express");
var app = express();
var fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.sendFile( __dirname + "/public/index.html");
});

app.get("/public/guestbook", function (req, res) {

    let data = require("./data.json");

    console.log(data);

    let guestbook = "<table border='1' style='width:100%;'>" +
                    "<tr style='width:100%'><th style='width:90%' >Message</th><th>Username</th><th>Country</th></tr>";

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

});
app.post("/public/newmessage", function (req,res) {
    
    let data = require("./data.json");

    data.push( {
        "username": req.body.username,
        "country": req.body.country,
        "date" : new Date(),
        "message": req.body.message
    });

    // Stringify the updated json array and write it into a file
    let dataStringify = JSON.stringify(data);

    fs.writeFile("./data.json", dataStringify, function (err) {
        if (err) return console.log(err);
    });
    res.redirect("/public/guestbook");
    
});
app.get("/ajaxmessage", function (req, res) {
    res.sendFile( __dirname + "/public/ajaxmessage.html");
});
app.get("*", function (req, res) {
    res.send("Can't find requested page");
});


app.listen(PORT);