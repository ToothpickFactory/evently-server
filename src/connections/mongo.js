const config      = require('config');
const MongoClient = require('mongodb').MongoClient;

let _db;

async function connect(){
	_db = await MongoClient.connect(config.mongo.db);
	return _db;
}

async function getDB(){
	return _db ? Promise.resolve(_db) : await connect();
}

module.exports = { getDB }