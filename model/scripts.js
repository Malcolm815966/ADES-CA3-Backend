// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const pg = require('pg')
const jwt = require("jsonwebtoken");
const config = require("../config");
const connectionString = `postgres://nntihaahbynyvl:e95b3d77ae6dbfeddbac6f37b0ce2c0ec0789b79692470c07c1a8d7b894270b6@ec2-52-0-67-144.compute-1.amazonaws.com:5432/d2snnmggr0fsrg`;

const pool = new pg.Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

export class scripts {
    static init() {
        return pool.query(`
            DROP TABLE IF EXISTS user;
            CREATE TABLE user (
                userid SERIAL NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE
                type VARCHAR(255) NOT NULL,
                profile_pic_url VARCHAR(255) NULL,
                created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL,
                password VARCHAR(45) NOT NULL,
                PRIMARY KEY(userid)
            );

            DROP TABLE IF EXISTS category;
            CREATE TABLE category (
                categoryid SERIAL NOT NULL,
                catname VARCHAR(255) NOT NULL UNIQUE,
                description VARCHAR(255) NULL,
                created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL,
                PRIMARY KEY(categoryid)
            );

            DROP TABLE IF EXISTS game;
            CREATE TABLE game (
                gameid SERIAL NOT NULL,
                title VARCHAR(255) NOT NULL UNIQUE,
                description VARCHAR(255) NULL,
                price DECIMAL(10, 0) NOT NULL,
                platform VARCHAR(45) NOT NULL,
                categoryid int NOT NULL,
                year int NOT NULL,
                created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL,
                image_file VARCHAR(255) NULL,
                PRIMARY KEY (gameid),
                FOREIGN KEY(categoryid) REFERENCES category(categoryid)
            );

            DROP TABLE IF EXISTS reviews;
            CREATE TABLE reviews (
                reviewid SERIAL NOT NULL,
                content VARCHAR(255) NULL,
                rating VARCHAR(10) NOT NULL,
                created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL,
                userid int NOT NULL,
                gameid int NOT NULL,
                PRIMARY KEY(reviewid),
                FOREIGN KEY(gameid) REFERENCES game(gameid),
                FOREIGN KEY(userid) REFERENCES user(userid)
            );
        `)
    }

    static insertTable() {
        return pool.query(`
            INSERT INTO user(username, email, type, profile_pic_url, password)
            VALUES ('Terry Tan', 'terry@gmail.com', 'Customer', 'https://www.abc.com/terry.jpg', 'terrypw'),
                ('Dave Lim', 'dave@gmail.com', 'Customer', 'daveLim.jpg,' 'davepw'),
                ('Malcolm Ng', 'malcolm@gmail.com', 'Customer', 'malcolm.jpg', 'malcolmpw'),
                ('Joe Joe', 'joe@gmail.com', 'Customer', 'joe.jpg', 'joepw'),
                ('Justin Toh', 'justin@gmail.com', 'Customer', 'justin.jpg', 'justinpw'),
                ('Ann Ang', 'annang@gmail.com', 'Admin', 'annang.jpg', 'annpw'),
                ('Tom Tam', 'tomtam@gmail.com', 'Customer', 'tomtam.jpg', 'tompw');

            INSERT INTO category(catname, description)
            VALUES ('Action', 'An action game emphasizes physical challenges, including hand–eye coordination and reaction-time'),
                ('Adventure', 'A type of video game in which the participant plays a fantasy role in an episodic adventure story.'),
                ('Puzzle', 'A puzzle is a game, problem, or toy that tests a person's ingenuity or knowledge. In a puzzle, the solver is expected to put pieces together in a logical way, in order to arrive at the correct or fun solution of the puzzle.'),
                ('Survival Horror', 'Survival horror is a subgenre of action-adventure and horror video games that focuses on survival of the character as the game tries to frighten players with either horror graphics or scary ambience.'),
                ('First Person Shooter', 'First-person shooter is a video game genre centered on gun and other weapon-based combat in a first-person perspective; that is, the player experiences the action through the eyes of the protagonist.'),
                ('Math and Science', 'Games that involve math and science');
        `)
    }

    // Login
    static loginUser(email, password) {
        console.log("Connected!");
        const loginQuery = 'SELECT userid, username, type FROM user WHERE email = ? AND password = ?';
        pool.query(loginQuery, [email, password], function (err, result) {
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

    static displayAllPlatforms() {
        const findAllPlatformsQuery = "SELECT DISTINCT platform FROM game ORDER BY gameid;";
        return pool.query(findAllPlatformsQuery)
    }

    static displayAllGames() {
        const findAllGamesQuery = "SELECT * FROM game;";
        return pool.query(findAllGamesQuery)
    }

    static searchForGame(title, price, platform) {
        title = "%" + title + "%"

        if (title == "%%" && price == "" && platform == "") {
            var searchForGameQuery = "SELECT * FROM game";
            return pool.query(searchForGameQuery)
        } else if (title == "%%" && price == "" && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE platform = ?";
            return pool.query(searchForGameQuery)
        } else if (title == "%%" && price != null && platform == "") {
            var searchForGameQuery = "SELECT * FROM game WHERE (price <= ?)";
            return pool.query(searchForGameQuery)
        } else if (title == "%%" && price != null && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE (price <= ?) AND (platform = ?)";
            return pool.query(searchForGameQuery)
        } else if (title != "%%" && price == "" && platform == "") {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?)";
            return pool.query(searchForGameQuery)
        } else if (title != "%%" && price == "" && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (platform = ?)";
            return pool.query(searchForGameQuery)
        } else if (title != "%%" && price != null && platform == "") {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (price <= ?)";
            return pool.query(searchForGameQuery)
        } else if (title != "%%" && price != null && platform != null) {
            var searchForGameQuery = "SELECT * FROM game WHERE (title LIKE ?) AND (price <= ?) AND (platform = ?)";
            return pool.query(searchForGameQuery)
        }
    }

    static displayGameDetails(gameid) {
        const displayAllGamesQuery =
            `SELECT DISTINCT user.username, game.title, game.year, game.platform, game.price, game.description, game.image_file, category.catname
                FROM sp_games.user, sp_games.game, sp_games.category
                WHERE sp_games.game.categoryid = sp_games.category.categoryid AND sp_games.game.gameid = ?`;
        return pool.query(displayAllGamesQuery, [gameid])
    }

    static displayAllCategories() {
        const findAllCategoriesQuery = "SELECT DISTINCT catname FROM category ORDER BY categoryid;";
        return pool.query(findAllCategoriesQuery)
    }

    static addGame(title, description, price, platform, year, categoryid, image_file) {
        const addGameQuery = `INSERT INTO game (title, description, price, platform, year, categoryid, image_file)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
        return pool.query(addGameQuery, [title, description, price, platform, year, categoryid, image_file])
    }

    static addCategories(catname, description) {
        const addCategoryQuery =
            `
            INSERT INTO category (catname, description)
            VALUES (?, ?);
            `;
        return pool.query(addCategoryQuery, [catname, description])
    }

    static displayGameReviews(gameid) {
        const displayAllGamesQuery =
            `SELECT DISTINCT user.username, reviews.content, reviews.rating, reviews.created_at
                FROM sp_games.user, sp_games.game, sp_games.category, sp_games.reviews
                WHERE sp_games.game.gameid = sp_games.reviews.gameid AND sp_games.reviews.userid = sp_games.user.userid AND sp_games.game.gameid = ?`;
        return pool.query(displayAllGamesQuery, [gameid])
    }

    static addReview(content, rating, userid, gameid) {
        const insertReviewQuery =
            `
            INSERT INTO reviews (content, rating, userid, gameid)
            VALUES (?, ?, ?, ?);
            `;
        return pool.query(insertReviewQuery, [content, rating, userid, gameid])
    }
}