const shortid       = require('shortid');
const db            = require('../../connections/mongo');
const validateEvent = require('./validateEvent');

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

    return validateEvent(newEvent)
        .then(validatedEvent => db.events.insert(validatedEvent));
}
