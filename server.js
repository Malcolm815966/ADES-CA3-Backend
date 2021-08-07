// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

// var app = require("./controller/app");
import { app } from "./controller/app"
const PORT = process.env.PORT || 3000;
var hostname = "localhost";

var server = app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});