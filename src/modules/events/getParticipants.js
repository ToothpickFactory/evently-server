const appRootDir	= require('app-root-dir').get();
const Mongo         = require(appRootDir + '/src/connections/mongo');

module.exports = async function(_id){
    let db = await Mongo.getDB();
    return db.collection('events').findOne({_id}, {_id: 0, participants: 1});
}