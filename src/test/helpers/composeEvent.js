const core = require("../testData/core.json");

function composeEvent(){
	let event = {
		"clientId": core.clientIds.clientId1,
		"title": core.titles.title1,
		"slots": core.slots.slots1,
		"startTime": Date.now() + core.startTimes.min_5,
		"owner": core.users.user1,
		"webhook": core.webhooks.webhook1
	}

let cp_event = Object.assign({}, event)
return cp_event;	
}

module.exports = composeEvent;