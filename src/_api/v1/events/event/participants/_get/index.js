const EventsModule = require("../../../../modules/events");
const errRes = require("../../../../util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events/:id/participants', (req, res) => {
		let eventId = req.params.id;
		EventsModule.getParticipants(eventId)
			.then(participants => res.send(participants))
			.catch(err => errRes(err, res))
	});
};
