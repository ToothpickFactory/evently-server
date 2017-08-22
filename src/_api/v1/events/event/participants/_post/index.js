const EventsModule = require("../../../../modules/events");
const errRes = require("../../../../util/errRes");

// Routes
module.exports = (app) => {

	app.post('/events/:id/participants', (req, res) => {
		let eventId = req.params.id;			
		let participant = req.body;
		EventsModule.joinEvent(eventId, participant)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});

};
