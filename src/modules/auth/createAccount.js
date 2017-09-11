const shortid       = require('shortid');
const crypto		= require('crypto');
const appRootDir    = require('app-root-dir').get();
const validateEvent = require(appRootDir + "/src/schemas/account/validator");
const Mongo         = require(appRootDir + '/src/connections/mongo');

async function createAccount (email, password) {
	let db = await Mongo.getDB();
	let result = validateEvent({email, password});

	if(result.errors.length) return Promise.reject(result.errors);

	let account = {
		_id: shortid.generate(),
		email: email,
		password: crypto.createHash("SHA1").update(password).digest('hex')
	}

	return db.collection('accounts').insert(account);
}

module.exports = createAccount;