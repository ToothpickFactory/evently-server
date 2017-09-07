const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events', (req, res) => {
		EventsModule.getEvents()
			.then(events => res.send(events))
			.catch(err => {
				console.log(err)
				errRes(err, res);
			})
	});
};
