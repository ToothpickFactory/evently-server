const appRootDir    = require('app-root-dir').get();
const shortid       = require('shortid');
const validateEvent = require(appRootDir + "/src/schemas/event/validator");
const Mongo         = require(appRootDir + '/src/connections/mongo');

async function doUpdate(_id, updatedEvent) {
    let db = await Mongo.getDB();
    let query = { _id }; 
    let sort = [];
    let update = updatedEvent;
    let options = { new: true };
    let dbRes = await db.collection('events').findAndModify(query, sort, update, options);
    return dbRes.value;
}

async function updateEvent(_id, event) {
    let updatedEvent = {
        "clientId":event.clientId,
        "secondId": event.secondId,
        "thirdId": event.thirdId,
        "title": event.title,
        "slots": event.slots,
        "startTime": event.startTime,
        "owner": {
            id: event.owner.id || event.owner.name.toUpperCase(),
            name: event.owner.name
        },
        "participants": event.participants || [],
        "webhook": event.webhook
    }
    let result = validateEvent(updatedEvent);
    return result.errors.length ? Promise.reject(result.errors) : doUpdate(_id, updatedEvent);
}

module.exports = updateEvent;


