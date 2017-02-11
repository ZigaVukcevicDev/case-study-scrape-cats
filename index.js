const request = require("tinyreq");

request("http://ionicabizau.net/", function (err, body) {
    console.log(err || body); // Print out the HTML
});