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

describe('Delete Event', function() {
	let _event;
	before(() => generateEvent().then(event => _event = event));
	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#DELETE /event/:eventId', function() {
	  it('should delete event', function() {
			return chai.request(core.urls.evently)
				.delete(`/events/${_event._id}`)
				.then(res => {
					expect(res).to.have.status(200);
				})
	  });
	});
});