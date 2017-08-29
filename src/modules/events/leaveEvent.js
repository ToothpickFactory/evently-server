const appRootDir	= require('app-root-dir').get();
const db            = require(appRootDir + '/src/connections/mongo');
const codes         = require('../codes');

module.exports = function(_id, userId){
    return db.events.findAndModify({
        query: { _id, 'participants.id': {$eq: userId} },
        update: { $pull: { participants: { id: userId } } },
        new: true
    }).then(dbRes => {
        if(dbRes.lastErrorObject.updatedExisting && dbRes.lastErrorObject.n){
            return dbRes.value
        } else if(!dbRes.lastErrorObject.updatedExisting){
            return Promise.reject(codes.notInEvent());
        }
    });
}