// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const pg = require('pg')
const connectionString = `postgres://nntihaahbynyvl:e95b3d77ae6dbfeddbac6f37b0ce2c0ec0789b79692470c07c1a8d7b894270b6@ec2-52-0-67-144.compute-1.amazonaws.com:5432/d2snnmggr0fsrg`;

const pool = new pg.Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports.init = function init() {
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

module.exports.insertTable = function insertTable() {
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

// put this at the end of the file
module.exports.db = pool;