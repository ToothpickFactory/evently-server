const db        = require('../../connections/mongo');
const shortid   = require('shortid');

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

    return db.events.findAndModify({
        query: {_id},
        update: updatedEvent,
        new: true
    });
}


