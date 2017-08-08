const schedule = require('node-schedule');
const webhooks = require('../modules/webhooks');
 
schedule.scheduleJob('*/1 * * * *', function(){
	webhooks.startingSoon();
});