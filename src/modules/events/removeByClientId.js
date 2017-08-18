const db = require('../../connections/mongo');

function removeByClientId(clientId){
	return db.events.remove({clientId});
}

module.exports = removeByClientId;
