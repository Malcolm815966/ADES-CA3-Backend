// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const mysql = require("mysql");

var dbconnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Redhill2.',
      database: 'sp_games',
      dateStrings: true
    });
    return conn;
  }
};

// put this at the end of the file
module.exports = dbconnect;