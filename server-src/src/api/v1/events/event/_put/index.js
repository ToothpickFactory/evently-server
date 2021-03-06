const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.put('/events/:id', (req, res) => {
		let id = req.params.id;
		let clientId = req.auth._id;
		EventsModule.updateEvent(id, req.body, clientId)
			.then(newEvent => res.send(newEvent))
			.catch(err => errRes(err, res))
	});
};
