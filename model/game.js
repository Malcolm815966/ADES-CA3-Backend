// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const db = require("./databaseConfig");

const gameDB = {

    displayAllPlatforms: function () {
        const findAllPlatformsQuery = "SELECT DISTINCT platform FROM game ORDER BY gameid;";
        return db.query(findAllPlatformsQuery)
    },

    displayAllGames: function () {
        const findAllGamesQuery = "SELECT * FROM game;";
        return db.query(findAllGamesQuery)
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