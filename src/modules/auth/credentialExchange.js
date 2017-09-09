const config				= require("config");
const appRootDir    = require('app-root-dir').get();
const Mongo         = require(appRootDir + '/src/connections/mongo');
const codes         = require(appRootDir + '/src/modules/codes');
const crypto				= require('crypto');
const jwt						= require('jsonwebtoken');


async function credentialExchange (authData) {
	let db = await Mongo.getDB();
	if(!authData) return Promise.reject(codes.credentialsRequired());
	let account = {
		email: authData.name,
		password: crypto.createHash("SHA1").update(authData.pass).digest('hex')
	}

	return db.collection('accounts').findOne(account, {_id: 1})
		.then(dbRes => {
			let token = jwt.sign(dbRes, config.jwt.key);
			return {token};
		})
}

module.exports = credentialExchange;