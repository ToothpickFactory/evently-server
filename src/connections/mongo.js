const pmongo      = require('promised-mongo');
const config      = require('config');

let db = pmongo(config.mongo.db, ['events']);

module.exports = db;
