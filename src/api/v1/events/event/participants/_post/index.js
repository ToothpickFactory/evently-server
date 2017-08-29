const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

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
