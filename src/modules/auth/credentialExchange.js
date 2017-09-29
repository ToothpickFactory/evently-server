const config		= require("config");
const appRootDir    = require('app-root-dir').get();
const Mongo         = require(appRootDir + '/src/connections/mongo');
const codes         = require(appRootDir + '/src/modules/codes');
const crypto		= require('crypto');
const jwt			= require('jsonwebtoken');


async function credentialExchange (email, password) {
	let db = await Mongo.getDB();
	if(!email || !password) return Promise.reject(codes.credentialsRequired());
	let account = {
		email: email.toUpperCase(),
		password: crypto.createHash("SHA1").update(password).digest('hex')
	}

	console.log(account)

	return db.collection('accounts').findOne(account, {_id: 1})
		.then(dbRes => {
			let token = jwt.sign(dbRes, config.jwt.key);
			return {token};
		})
		.catch(err => {
			console.log(err);
			return Promise.reject(err)
		})
}

module.exports = credentialExchange;