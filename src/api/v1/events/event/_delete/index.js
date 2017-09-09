const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {

	app.delete('/events/:id', (req, res) => {
		let id = req.params.id;
		EventsModule.deleteEvent(id)
			.then(() => res.send())
			.catch(err => {
				console.log(err)
				errRes(err, res)
			})
	});

};
