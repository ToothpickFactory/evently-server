const appRootDir	= require('app-root-dir').get();
const db            = require(appRootDir + '/src/connections/mongo');
const callHook      = require(appRootDir + '/src/modules/webhooks/callHook');

module.exports = function(_id){
    return db.events.findAndModify({
        query: {_id},
        remove: true,
        new: false
    }).then(DBRes => {
        callHook("EVENT_REMOVED", DBRes.value);
    });
}