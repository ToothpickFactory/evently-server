const chai            = require("chai"),
      chaiAsPromised  = require("chai-as-promised"),
      expect          = chai.expect,
      chaiHttp				= require('chai-http');

const core = require("../../test/testData/core.json");
const composeEvent = require("../../test/helpers/composeEvent");
const removeEventTests = require("../../test/helpers/removeEventTests");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Create Event', function() {

	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#CREATE /events', function() {
	  it('should return a new event', function() {
			
			let event = composeEvent();
			
			return chai.request(core.urls.evently)
				.post(`/events`)
				.send(event)
				.then(res => {
					expect(res.body).to.have.property("_id");
				});

	  });
	});

});