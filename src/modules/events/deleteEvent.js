const db = require('../../connections/mongo');
const callHook = require('../webhooks/callHook');

module.exports = function(_id){
    console.log(_id)
    return db.events.findAndModify({
        query: {_id},
        remove: true,
        new: false
    }).then(DBRes => {
        console.log(DBRes.value);
        callHook("EVENT_REMOVED", DBRes.value);
    });
}