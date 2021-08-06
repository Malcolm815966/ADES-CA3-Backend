// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const jwt = require("jsonwebtoken");
const db = require("./databaseConfig");
const config = require("../config");

const userDB = {

    // Login
    loginUser: function (email, password) {
        console.log("Connected!");
        var sql = 'SELECT userid, username, type FROM user WHERE email = ? AND password = ?';
        db.query(sql, [email, password], function (err, result) {
            conn.end();
            if (err) {
                console.log("Err: " + err);
                return callback(err, null, null);
            } else {
                var token = "";
                if (result.length == 1) {
                    token = jwt.sign({ userid: result[0].userid, type: result[0].type }, config, {
                        expiresIn: 86400 //expires in 24 hrs
                    });
                    console.log("@@token " + token);
                    return callback(null, token, result);
                } else {
                    var err2 = new Error("UserID/Password does not match.");
                    err2.statusCode = 500;
                    return callback(err2, null, null);
                }
            }
        });
    }

};

module.exports = userDB;
