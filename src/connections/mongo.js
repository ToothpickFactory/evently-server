const config      = require('config');
const MongoClient = require('mongodb').MongoClient;

async function getDB(){
	return MongoClient.connect(config.mongo.db);
}

module.exports = { getDB }


// const pmongo      = require('promised-mongo');
// const config      = require('config');

// let db = pmongo(config.mongo.db, ['events']);

// module.exports = db;
