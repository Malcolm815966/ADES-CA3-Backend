// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

var check = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        res.status(401).send();
        console.log("Not found")
        return;
    }
    const token = authHeader.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
        if (error) {
            res.status(401).send("Invalid Token");
            console.log(JWT_SECRET)
            console.log(token)
            console.log(error)
            return;
        }
        req.decodedToken = decodedToken;
        next();
    });
};
module.exports = check;
