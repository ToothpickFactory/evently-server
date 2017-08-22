const EventsModule = require("../../../../modules/events");
const errRes = require("../../../../util/errRes");

// Routes
module.exports = (app) => {
	app.delete('/events/:id/participants/:userId', (req, res) => {
		let eventId = req.params.id;			
		let userId = req.params.userId;
		EventsModule.leaveEvent(eventId, userId)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});
};
