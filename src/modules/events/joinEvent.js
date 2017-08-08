const db = require('../../connections/mongo');
const codes = require('../codes');

module.exports = function(_id, participant){
    let newParticipant = {
        id: participant.id || participant.name.toUpperCase(),
        name: participant.name
    }

    return db.events.findAndModify({
        query: { _id, 'participants.id': {$ne: newParticipant.id} },
        update: { $push: { participants: newParticipant } },
        new: true
    }).then(dbRes => {
         if(dbRes.lastErrorObject.updatedExisting && dbRes.lastErrorObject.n){
            return dbRes.value
        } else if(!dbRes.lastErrorObject.updatedExisting){
            return Promise.reject(codes.userInEvent());
        }
    });
}