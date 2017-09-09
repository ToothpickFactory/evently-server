const appRootDir    = require('app-root-dir').get();
const Mongo         = require(appRootDir + '/src/connections/mongo');
const codes         = require('../codes');

module.exports = async function(_id) {
    let db = await Mongo.getDB();
    let event = await db.collection('events').findOne({_id});
    return event ? event : Promise.reject(codes.eventNotFound(_id));
}