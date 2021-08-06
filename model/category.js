// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const db = require("./databaseConfig");

const categoryDB = {

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