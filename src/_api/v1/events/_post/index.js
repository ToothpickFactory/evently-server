const EventsModule = require("../../modules/events");
const errRes = require("../../util/errRes");

// Routes
module.exports = (app) => {
	app.post('/events', (req, res) => {
		EventsModule.createEvent(req.body)
			.then(newEvent => res.send(newEvent))
			.catch(err => errRes(err, res))
	});
};
