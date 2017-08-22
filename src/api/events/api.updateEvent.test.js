const chai            = require("chai"),
      chaiAsPromised  = require("chai-as-promised"),
      expect          = chai.expect,
      chaiHttp				= require('chai-http');

const core = require("../../test/testData/core.json");
const generateEvent = require("../../test/helpers/generateEvent");
const removeEventTests = require("../../test/helpers/removeEventTests");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Update Event', function() {
	let _event;
	before(() => generateEvent().then(event => _event = event));
	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#PUT /event/:eventId', function() {
	  it('should update event name', function() {
			let newTitle = "Mr McTesty";
			let newIshEvent = Object.assign({}, _event, {title: newTitle});

			return chai.request(core.urls.evently)
				.put(`/events/${_event._id}`)
				.send(newIshEvent)
				.then(res => {
					expect(res.body.value).to.have.property("title").that.equals(newTitle);
				});

			});
	});
});