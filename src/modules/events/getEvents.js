const appRootDir	= require('app-root-dir').get();
const Mongo       = require(appRootDir + '/src/connections/mongo');

module.exports = async function(rawQuery = {}){
  let query = queryBuilder(rawQuery);
  let db = await Mongo.getDB();
  let documents = await db.collection('events').find(query).toArray();
  return documents;
}

function queryBuilder(rawQuery){
  let query = {};
  if(rawQuery.rangeStart){
    if(!query.startTime) query.startTime = {};
    query.startTime.$gt = rawQuery.rangeStart;
  }

  if(rawQuery.rangeEnd){
    if(!query.startTime) query.startTime = {};
    query.startTime.$lt = rawQuery.rangeEnd;
  }

  return query;
}