// Class: DIT/FT/1B/04
// Admission Number: p2020994
// Name: Malcolm Ng

const db = require("./databaseConfig");

const categoryDB = {
    addCategories: function (catname, description) {
        const addCategoryQuery =
            `
            INSERT INTO category (catname, description)
            VALUES (?, ?);
            `;
        return db.query(addCategoryQuery, [catname, description])
    }
}

module.exports = categoryDB;