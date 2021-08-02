// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

var app = require("./controller/app");
var port = 3000;
var hostname = "localhost";

var server = app.listen(port, () => {
    console.log(`BackEnd Server Hosted at http://${hostname}:${port}`);
});