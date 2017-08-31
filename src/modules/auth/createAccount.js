const shortid       = require('shortid');
const crypto				= require('crypto');
const appRootDir    = require('app-root-dir').get();
const validateEvent = require(appRootDir + "/src/schemas/account/validator");
const db            = require(appRootDir + '/src/connections/mongo');

function createAccount (email, password) {
	let result = validateEvent({email, password});

	if(result.errors.length) return Promise.reject(result.errors);

	let account = {
		_id: shortid.generate(),
		email: email,
		password: crypto.createHash("SHA1").update(password).digest('hex')
	}

	return db.accounts.insert(account);
}

module.exports = createAccount;