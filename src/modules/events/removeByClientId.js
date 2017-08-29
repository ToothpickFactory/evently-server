const appRootDir	= require('app-root-dir').get();
const db          = require(appRootDir + '/src/connections/mongo');

function removeByClientId(clientId){
	return db.events.remove({clientId});
}

module.exports = removeByClientId;
