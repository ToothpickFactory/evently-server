const EventsModule = require("../../modules/events");
const errRes = require("../../util/errRes");

// Routes
module.exports = (app) => {
  	// ********** EVENT ***********
	app.get('/events', (req, res) => {
		EventsModule.getEvents()
			.then(events => res.send(events))
			.catch(err => errRes(err, res))
	});

	app.post('/events', (req, res) => {
		EventsModule.createEvent(req.body)
			.then(newEvent => res.send(newEvent))
			.catch(err => errRes(err, res))
	});
	
	app.get('/events/:id', (req, res) => {
		let id = req.params.id;
		EventsModule.getEvent(id)
			.then(event => res.send(event))
			.catch(err => errRes(err, res))
	});

	app.put('/events/:id', (req, res) => {
		let id = req.params.id;
		EventsModule.updateEvent(id, req.body)
			.then(newEvent => res.send(newEvent))
			.catch(err => errRes(err, res))
	});

	app.delete('/events/:id', (req, res) => {
		let id = req.params.id;
		EventsModule.deleteEvent(id)
			.then(() => res.send())
			.catch(err => errRes(err, res))
	});

	// ********** EVENT PARTICIPANTS ***********
	app.get('/events/:id/participants', (req, res) => {
		let eventId = req.params.id;
		EventsModule.getParticipants(eventId)
			.then(participants => res.send(participants))
			.catch(err => errRes(err, res))
	});

	app.post('/events/:id/participants', (req, res) => {
		let eventId = req.params.id;			
		let participant = req.body;
		EventsModule.joinEvent(eventId, participant)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});

	app.delete('/events/:id/participants/:userId', (req, res) => {
		let eventId = req.params.id;			
		let userId = req.params.userId;
		EventsModule.leaveEvent(eventId, userId)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});
};
