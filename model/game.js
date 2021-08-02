// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const db = require("./databaseConfig");

const gameDB = {

    // // Endpoint 06
    // insert: function (newUserObject, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             callback(err, null);
    //         } else {
    //             var { title, description, price, platform, categoryid, year } = newUserObject;
    //             const insertUserQuery =
    //                 `
    //             INSERT INTO game (title, description, price, platform, categoryid, year)
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

    // // Endpoint 07
    // findPlatform: function (platform, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             callback(err, null);
    //         } else {
    //             const findPlatformByQuery = `SELECT game.gameid, game.title, game.description, game.price, game.platform, game.categoryid, category.catname, game.year, game.created_at 
    //             FROM sp_games.game, sp_games.category
    //             WHERE sp_games.game.categoryid = sp_games.category.categoryid AND sp_games.game.platform = ?;`;
    //             dbConn.query(findPlatformByQuery, [platform], (error, results) => {
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

    // // Endpoint 08
    // delete: function (gameid, callback) {
    //     var conn = db.getConnection();
    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         } else {
    //             console.log("Connected!");
    //             var sql = 'DELETE FROM game WHERE gameid = ?';
    //             conn.query(sql, [gameid], function (err, result) {
    //                 conn.end();
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     return callback(null, result.affectedRows);
    //                 }
    //             });
    //         }
    //     });
    // },

    // // Endpoint 9
    // updateGame: function (title, description, price, platform, categoryid, year, gameid, callback) {
    //     var conn = db.getConnection();
    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         } else {
    //             console.log("Connected!");
    //             var sql = 'SELECT title, description, price, platform, categoryid, year FROM game WHERE gameid = ?;';
    //             conn.query(sql, [gameid], function (err, result) {
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     sql = 'UPDATE game SET title = ?, description = ?, price = ?, platform = ?, categoryid = ?, year = ? WHERE gameid = ?;';
    //                     conn.query(sql, [title, description, price, platform, categoryid, year, gameid], function (err, result) {
    //                         conn.end();
    //                         if (err) {
    //                             console.log(err);
    //                             return callback(err, null);
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

    // // Endpoint 11
    // retrieveReviews: function (id, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             callback(err, null);
    //         } else {
    //             const findUserByIDQuery = `SELECT reviews.gameid, reviews.content, reviews.rating, user.username, reviews.created_at 
    //             FROM sp_games.reviews, sp_games.user 
    //             WHERE sp_games.reviews.userid = sp_games.user.userid AND sp_games.reviews.gameid = ?`;
    //             dbConn.query(findUserByIDQuery, [id], (error, results) => {
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

    displayAllPlatforms: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                const findAllPlatformsQuery = "SELECT DISTINCT platform FROM game ORDER BY gameid;";
                dbConn.query(findAllPlatformsQuery, (error, results) => {
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

    displayAllGames: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                const findAllGamesQuery = "SELECT * FROM game;";
                dbConn.query(findAllGamesQuery, (error, results) => {
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

    searchForGame: function (title, price, platform, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                title = "%" + title + "%"

                if (title == "%%" && price == "" && platform == "") {
                    var searchForGameQuery = "SELECT * FROM game";
                    dbConn.query(searchForGameQuery, (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                } else if (title == "%%" && price == "" && platform != null) {
                    var searchForGameQuery = "SELECT * FROM game WHERE platform = ?";
                    dbConn.query(searchForGameQuery, [platform], (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                } else if (title == "%%" && price != null && platform == "") {
                    var searchForGameQuery = "SELECT * FROM game WHERE (price <= ?)";
                    dbConn.query(searchForGameQuery, [price], (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                } else if (title == "%%" && price != null && platform != null) {
                    var searchForGameQuery = "SELECT * FROM game WHERE (price <= ?) AND (platform = ?)";
                    dbConn.query(searchForGameQuery, [price, platform], (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                } else if (title != "%%" && price == "" && platform == "") {
                    var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?)";
                    dbConn.query(searchForGameQuery, [title], (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                } else if (title != "%%" && price == "" && platform != null) {
                    var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (platform = ?)";
                    dbConn.query(searchForGameQuery, [title, platform], (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                } else if (title != "%%" && price != null && platform == "") {
                    var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (price <= ?)";
                    dbConn.query(searchForGameQuery, [title, price], (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                } else if (title != "%%" && price != null && platform != null) {
                    var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (price <= ?) AND (platform = ?)";
                    dbConn.query(searchForGameQuery, [title, price, platform], (error, results) => {
                        dbConn.end();
                        if (error) {
                            callback(error, null);
                        } else {
                            console.log(results)
                            callback(null, results);
                        }
                    });
                }
            }
        });
    },

    displayGameDetails: function (gameid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                const displayAllGamesQuery =
                    `SELECT DISTINCT user.username, game.title, game.year, game.platform, game.price, game.description, game.image_file, category.catname
                FROM sp_games.user, sp_games.game, sp_games.category
                WHERE sp_games.game.categoryid = sp_games.category.categoryid AND sp_games.game.gameid = ?`;
                dbConn.query(displayAllGamesQuery, [gameid], (error, results) => {
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

    displayAllCategories: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                const findAllCategoriesQuery = "SELECT DISTINCT catname FROM category ORDER BY categoryid;";
                dbConn.query(findAllCategoriesQuery, (error, results) => {
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

    addGame: function (title, description, price, platform, year, categoryid, image_file, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                const addGameQuery =
                    `
            INSERT INTO game (title, description, price, platform, year, categoryid, image_file)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
                dbConn.query(
                    addGameQuery,
                    [title, description, price, platform, year, categoryid, image_file],
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

module.exports = gameDB;