const appRootDir	= require('app-root-dir').get();
const db            = require(appRootDir + '/src/connections/mongo');

module.exports = function(_id){
    return db.events.findOne({_id}, {_id: 0, participants: 1});
}