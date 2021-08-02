// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const db = require("./databaseConfig");

const categoryDB = {

    // Endpoint 04
    // insertNewCategory: function (catname, description, callback) {
    //     var conn = db.getConnection();
    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         } else {
    //             console.log("Connected!");
    //             var sql = 'SELECT categoryid FROM category WHERE catname = ?;';
    //             conn.query(sql, [catname], function (err, result) {
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else if (result.length !== 0) {
    //                     console.log("it already exists");
    //                     return callback(null, "The category name provided already exists");
    //                 } else {
    //                     sql = 'INSERT into category(catname, description) values(?,?)';
    //                     conn.query(sql, [catname, description], function (err, result) {
    //                         conn.end();
    //                         if (err) {
    //                             console.log(err);
    //                             return callback(err, null);
    //                         } else {
    //                             console.log(result.insertId);
    //                             return callback(null, result);
    //                         }
    //                     });
    //                 }
    //             });

    //         }
    //     });
    // },

    // Endpoint 05
    // updateUser: function (newcatname, newdescription, categoryid, callback) {
    //     var conn = db.getConnection();
    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         } else {
    //             console.log("Connected!");
    //             var sql = 'SELECT catname, description FROM category WHERE categoryid = ?;';
    //             conn.query(sql, [categoryid], function (err, result) {
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {

    //                     if (!newcatname) newcatname = result[0].catname;
    //                     if (!newdescription) newdescription = result[0].description;

    //                     sql = 'UPDATe category SET catname = ?, description = ? WHERE categoryid = ?;';
    //                     conn.query(sql, [newcatname, newdescription, categoryid], function (err, result) {
    //                         conn.end();
    //                         if (err) {
    //                             console.log(err);
    //                             if (err.code === "ER_DUP_ENTRY") {
    //                                 return callback(err, -1);
    //                             } else {
    //                                 return callback(err, null);
    //                             }
    //                         } else {
    //                             console.log(result);
    //                             return callback(null, result.changedRows);
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // },

    addCategories: function (catname, description, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                const addCategoryQuery =
                    `
            INSERT INTO category (catname, description)
            VALUES (?, ?);
            `;
                dbConn.query(
                    addCategoryQuery,
                    [catname, description],
                    (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results);
                        }
                    });
            }
        });
    },
}

module.exports = categoryDB;