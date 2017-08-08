const db = require('../../connections/mongo');

module.exports = function(_id){
    return db.events.findOne({_id}, {_id: 0, participants: 1});
}