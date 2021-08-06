// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const db = require("./databaseConfig");

const gameDB = {

    displayGameReviews: function (gameid) {
        const displayAllGamesQuery =
            `SELECT DISTINCT user.username, reviews.content, reviews.rating, reviews.created_at
                FROM sp_games.user, sp_games.game, sp_games.category, sp_games.reviews
                WHERE sp_games.game.gameid = sp_games.reviews.gameid AND sp_games.reviews.userid = sp_games.user.userid AND sp_games.game.gameid = ?`;
        return db.query(displayAllGamesQuery, [gameid])
    },

    addReview: function (content, rating, userid, gameid) {
        const insertReviewQuery =
            `
            INSERT INTO reviews (content, rating, userid, gameid)
            VALUES (?, ?, ?, ?);
            `;
        return db.query(insertReviewQuery, [content, rating, userid, gameid])
    }

}

module.exports = gameDB;