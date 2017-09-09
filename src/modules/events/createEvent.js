const shortid       = require('shortid');
const appRootDir    = require('app-root-dir').get();
const validateEvent = require(appRootDir + "/src/schemas/event/validator");
const Mongo         = require(appRootDir + '/src/connections/mongo');

module.exports = async function(event){
    let db = await Mongo.getDB();
    let newEvent = {
        "_id": shortid.generate(),
        "clientId":event.clientId,
        "secondId": event.secondId,
        "thirdId": event.thirdId,
        "title": event.title,
        "slots": event.slots || 10,
        "startTime": event.startTime || Date.now() + 300000,
        "owner": {
            id: event.owner.id || event.owner.name.toUpperCase(),
            name: event.owner.name
        },
        "participants": [],
        "webhook": event.webhook
    }

    let result = validateEvent(newEvent);
    if( result.errors.length ){
        return Promise.reject(result.errors);
    } else {
        let dbRes = await db.collection('events').insert(newEvent);
        return dbRes.ops[0];
    }
}
