// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

var express = require("express");
var user = require("../model/user");
var category = require("../model/category");
var game = require("../model/game");
var reviews = require("../model/reviews");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");
const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");
var app = express();
var cors = require('cors');

app.options('*', cors());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Login Endpoint
app.post('/user/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, token, result) {
        if (!err) {
            console.log(result);
            res.status(200).json({ success: true, UserData: JSON.stringify(result[0]), token: token, status: 'You are successfully logged in!' });
        } else {
            res.status(500).send(err.statusCode);
        }
    });
});

// Display All Platforms
app.get("/displayAllPlatforms", (req, res) => {
    game.displayAllPlatforms((error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(results);
            console.log(results);
        }
    });
});

// Display All Games
app.get("/displayAllGames", (req, res) => {
    game.displayAllGames((error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(results);
            console.log(results);
        }
    });
});

// Search For Game
app.get("/searchForGame/:data", (req, res) => {
    var { title, price, platform } = JSON.parse(req.params.data);
    console.log(req.params.data)

    game.searchForGame(title, price, platform, (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(results);
            console.log(results);
        }
    });
});

// Display Game Details
app.get("/displayGameDetails/:gameid", (req, res) => {
    var gameid = req.params.gameid;
    game.displayGameDetails(gameid, (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(results);
            console.log(results);
        }
    });
});

// Display Game Reviews
app.get("/displayGameReviews/:gameid", (req, res) => {
    var gameid = req.params.gameid;
    reviews.displayGameReviews(gameid, (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(results);
            console.log(results);
        }
    });
});

// Add Review
app.post("/addReviews/:data", isLoggedInMiddleware, (req, res) => {
    console.log(req.decodedToken);
    console.log(req.decodedToken.type)
    var { content, rating, userid, gameid } = JSON.parse(req.params.data);
    console.log(req.params.data)

    if (req.decodedToken.type != "Customer") {
        res.status(401).send()
    } else {
        reviews.addReview(content, rating, userid, gameid, (error, results) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(results);
                console.log(results);
            }
        })
    }
});

// Display All Categories to add game
app.get("/displayAllCategories", (req, res) => {
    game.displayAllCategories((error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(results);
            console.log(results);
        }
    });
});

// Add Game
app.post("/addGames/:data", isLoggedInMiddleware, (req, res) => {
    var { title, description, price, platform, year, categoryid, image_file } = JSON.parse(req.params.data);
    console.log(req.params.data)

    if (req.decodedToken.type != "Admin") {
        res.status(401).send()
    } else {
        game.addGame(title, description, price, platform, year, categoryid, image_file, (error, results) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(results);
                console.log(results);
            }
        })
    }
});

// Add Category
app.post("/addCategories/:data", isLoggedInMiddleware, (req, res) => {
    var { catname, description } = JSON.parse(req.params.data);
    console.log(req.params.data)

    if (req.decodedToken.type != "Admin") {
        res.status(401).send()
    } else {
        category.addCategories(catname, description, (error, results) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(results);
                console.log(results);
            }
        })
    }
});

module.exports = app;