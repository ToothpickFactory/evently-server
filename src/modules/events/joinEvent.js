const appRootDir	    = require('app-root-dir').get();
const db                = require(appRootDir + '/src/connections/mongo');
const personValidator   = require(appRootDir + '/src/schemas/person/validator');
const codes             = require('../codes');

module.exports = function(_id, participant){
    let newParticipant = {
        id: participant.id || participant.name.toUpperCase(),
        name: participant.name
    }

    let result = personValidator(newParticipant);

    if(result.errors.length) return Promise.reject(result.errors);

    return db.events.findAndModify({
        query: { _id, 'participants.id': {$ne: newParticipant.id} },
        update: { $push: { participants: newParticipant } },
        new: true
    }).then(dbRes => {
         if(dbRes.lastErrorObject.updatedExisting && dbRes.lastErrorObject.n){
            return dbRes.value;
        } else if(!dbRes.lastErrorObject.updatedExisting){
            return Promise.reject(codes.userInEvent());
        }
    });
}