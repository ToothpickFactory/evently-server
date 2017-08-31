const config				= require("config");
const appRootDir    = require('app-root-dir').get();
const db            = require(appRootDir +'/src/connections/mongo');
const codes         = require(appRootDir + '/src/modules/codes');
const crypto				= require('crypto');
const jwt						= require('jsonwebtoken');


function credentialExchange (authData) {

	if(!authData) return Promise.reject(codes.credentialsRequired());
	let account = {
		email: authData.name,
		password: crypto.createHash("SHA1").update(authData.pass).digest('hex')
	}

	return db.accounts.findOne(account, {_id: 1})
		.then(dbRes => {
			let token = jwt.sign(dbRes, config.jwt.key);
			return {token};
		})
}

module.exports = credentialExchange;