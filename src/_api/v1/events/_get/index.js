const EventsModule = require("../../modules/events");
const errRes = require("../../util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events', (req, res) => {
		EventsModule.getEvents()
			.then(events => res.send(events))
			.catch(err => errRes(err, res))
	});
};
