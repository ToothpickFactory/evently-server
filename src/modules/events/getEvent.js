const appRootDir    = require('app-root-dir').get();
const db            = require(appRootDir +'/src/connections/mongo');
const codes         = require('../codes');

module.exports = function(_id){
    return db.events.findOne({_id})
        .then(event => event ? event : Promise.reject(codes.eventNotFound(_id)))
}