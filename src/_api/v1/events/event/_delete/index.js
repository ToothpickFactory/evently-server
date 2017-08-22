const EventsModule = require("../../../modules/events");
const errRes = require("../../../util/errRes");

// Routes
module.exports = (app) => {

	app.delete('/events/:id', (req, res) => {
		let id = req.params.id;
		EventsModule.deleteEvent(id)
			.then(() => res.send())
			.catch(err => errRes(err, res))
	});

};
