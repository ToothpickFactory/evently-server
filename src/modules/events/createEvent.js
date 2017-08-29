const shortid       = require('shortid');
const appRootDir    = require('app-root-dir').get();
const validateEvent = require(appRootDir + "/src/schemas/event/validator");
const db            = require(appRootDir + '/src/connections/mongo');

module.exports = function(event){
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
    return result.errors.length ? Promise.reject(result.errors) : db.events.insert(newEvent);
}
