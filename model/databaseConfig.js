// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

// const mysql = require("mysql");

// var dbconnect = {
//   getConnection: function () {
//     var conn = mysql.createConnection({
//       host: 'localhost',
//       port: 3306,
//       user: 'root',
//       password: 'Redhill2.',
//       database: 'sp_games',
//       dateStrings: true
//     });
//     return conn;
//   }
// };

const connectionString = `postgres://nntihaahbynyvl:e95b3d77ae6dbfeddbac6f37b0ce2c0ec0789b79692470c07c1a8d7b894270b6@ec2-52-0-67-144.compute-1.amazonaws.com:5432/d2snnmggr0fsrg`;

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

// put this at the end of the file
// module.exports = dbconnect;
module.exports = pool;