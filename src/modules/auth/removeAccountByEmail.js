const appRootDir    = require('app-root-dir').get();
const db            = require(appRootDir + '/src/connections/mongo');

function removeAccountByEmail (email) {
	return db.accounts.remove({email});
}

module.exports = removeAccountByEmail;