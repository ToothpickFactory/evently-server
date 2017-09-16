const appRootDir	= require('app-root-dir').get();
const Mongo       = require(appRootDir + '/src/connections/mongo');

async function getEvents(rawQuery = {}){
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

  if(rawQuery.tags){
    let tags = Array.isArray(rawQuery.tags) ? rawQuery.tags : [rawQuery.tags];
    query.tags = { $all: tags };
  }

  return query;
}

module.exports = getEvents;