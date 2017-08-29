const appRootDir    = require('app-root-dir').get();
const shortid       = require('shortid');
const validateEvent = require(appRootDir + "/src/schemas/event/validator");
const db            = require(appRootDir + '/src/connections/mongo');


module.exports = function(_id, event){
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

    if(result.errors.length){
        return Promise.reject(result.errors);
    } else {
        return db.events.findAndModify({
            query: {_id},
            update: updatedEvent,
            new: true
        });
    }
}


