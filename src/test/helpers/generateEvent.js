const composeEvent = require("./composeEvent");
const createEvent = require('../../modules/events/createEvent');

function generateEvent(){
	let event = composeEvent();
	return createEvent(event);
}
			
module.exports = generateEvent;