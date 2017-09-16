const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events', (req, res) => {
		let query = req.query;
		EventsModule.getEvents(query)
			.then(events => res.send(events))
			.catch(err => errRes(err, res))
	});
};
