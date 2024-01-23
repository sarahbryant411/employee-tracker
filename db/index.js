const connection = require('connection.js');

class Queries {
    constructor(db) {
        this.db = db;
    }


}

module.exports = new Queries(connection);
