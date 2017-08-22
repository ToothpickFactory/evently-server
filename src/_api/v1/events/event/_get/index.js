const EventsModule = require("../../../modules/events");
const errRes = require("../../../util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events/:id', (req, res) => {
		let id = req.params.id;
		EventsModule.getEvent(id)
			.then(event => res.send(event))
			.catch(err => errRes(err, res))
	});
};
