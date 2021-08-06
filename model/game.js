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

    searchForGame: function (title, price, platform) {
        title = "%" + title + "%"

        if (title == "%%" && price == "" && platform == "") {
            var searchForGameQuery = "SELECT * FROM game";
            return db.query(searchForGameQuery)
        } else if (title == "%%" && price == "" && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE platform = ?";
            return db.query(searchForGameQuery)
        } else if (title == "%%" && price != null && platform == "") {
            var searchForGameQuery = "SELECT * FROM game WHERE (price <= ?)";
            return db.query(searchForGameQuery)
        } else if (title == "%%" && price != null && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE (price <= ?) AND (platform = ?)";
            return db.query(searchForGameQuery)
        } else if (title != "%%" && price == "" && platform == "") {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?)";
            return db.query(searchForGameQuery)
        } else if (title != "%%" && price == "" && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (platform = ?)";
            return db.query(searchForGameQuery)
        } else if (title != "%%" && price != null && platform == "") {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (price <= ?)";
            return db.query(searchForGameQuery)
        } else if (title != "%%" && price != null && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (price <= ?) AND (platform = ?)";
            return db.query(searchForGameQuery)
        }
    },

    displayGameDetails: function (gameid) {
        const displayAllGamesQuery =
            `SELECT DISTINCT user.username, game.title, game.year, game.platform, game.price, game.description, game.image_file, category.catname
                FROM sp_games.user, sp_games.game, sp_games.category
                WHERE sp_games.game.categoryid = sp_games.category.categoryid AND sp_games.game.gameid = ?`;
        return db.query(displayAllGamesQuery, [gameid])
    },

    displayAllCategories: function () {
        const findAllCategoriesQuery = "SELECT DISTINCT catname FROM category ORDER BY categoryid;";
        return db.query(findAllCategoriesQuery)
    },

    addGame: function (title, description, price, platform, year, categoryid, image_file) {
        const addGameQuery = `INSERT INTO game (title, description, price, platform, year, categoryid, image_file)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
        return db.query(addGameQuery, [title, description, price, platform, year, categoryid, image_file])
    }
}

module.exports = gameDB;