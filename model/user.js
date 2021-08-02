// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const jwt = require("jsonwebtoken");
const db = require("./databaseConfig");
const config = require("../config");

const userDB = {

    // // Endpoint 01
    // findAll: function (callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             callback(err, null);
    //         } else {
    //             const findAllUsersQuery = "SELECT * FROM user;";
    //             dbConn.query(findAllUsersQuery, (error, results) => {
    //                 dbConn.end();
    //                 if (error) {
    //                     callback(error, null);
    //                 } else {
    //                     callback(null, results);
    //                 }
    //             });
    //         }
    //     });
    // },

    // // Endpoint 02
    // insert: function (newUserObject, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             callback(err, null);
    //         } else {
    //             var { username, email, type, profile_pic_url } = newUserObject;
    //             const insertUserQuery =
    //                 `
    //             INSERT INTO user (username, email, type, profile_pic_url)
    //             VALUES (?, ?, ?, ?);
    //             `;
    //             dbConn.query(
    //                 insertUserQuery,
    //                 [username, email, type, profile_pic_url],
    //                 (error, results) => {
    //                     dbConn.end();
    //                     if (error) {
    //                         callback(error, null);
    //                     } else {
    //                         callback(null, results.insertId);
    //                     }
    //                 });
    //         }
    //     });
    // },

    // // Endpoint 3
    // findByID: function (userID, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             callback(err, null);
    //         } else {
    //             const findUserByIDQuery = "SELECT * FROM user WHERE userid = ?;";
    //             dbConn.query(findUserByIDQuery, [userID], (error, results) => {
    //                 dbConn.end();
    //                 if (error) {
    //                     callback(error, null);
    //                 } else if (results.length === 0) {
    //                     callback("There are no records", "There are no records");
    //                 } else {
    //                     callback(null, results);
    //                 }
    //             });
    //         }
    //     });
    // },

    // // Endpoint 10
    // addNewReview: function (newReviewObject, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             callback(err, null);
    //         } else {
    //             var { title, description, price, platform, categoryid, year } = newReviewObject;
    //             const insertUserQuery =
    //                 `
    //             INSERT INTO reviews (title, description, price, platform, categoryid, year)
    //             VALUES (?, ?, ?, ?, ?, ?);
    //             `;
    //             dbConn.query(
    //                 insertUserQuery,
    //                 [title, description, price, platform, categoryid, year],
    //                 (error, results) => {
    //                     dbConn.end();
    //                     if (error) {
    //                         callback(error, null);
    //                     } else {
    //                         callback(null, results.insertId);
    //                     }
    //                 });
    //         }
    //     });
    // },

    // Login
    loginUser: function (email, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT userid, username, type FROM user WHERE email = ? AND password = ?';
                conn.query(sql, [email, password], function (err, result) {
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
        });
    },
};

module.exports = userDB;
