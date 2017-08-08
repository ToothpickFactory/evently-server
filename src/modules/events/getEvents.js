const db = require('../../connections/mongo');

module.exports = function(rawQuery = {}){
  let query = queryBuilder(rawQuery);
  return db.events.find(query);
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