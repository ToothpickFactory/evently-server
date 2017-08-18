const chai            = require("chai"),
      chaiAsPromised  = require("chai-as-promised"),
      expect          = chai.expect,
      rp              = require('request-promise');

const core = require("../../test/testData/core.json");
const composeEvent = require("../../test/helpers/composeEvent");
const removeEventTests = require("../../test/helpers/removeEventTests");

chai.should();
chai.use(chaiAsPromised);

describe('Create Event', function() {

	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#CREATE /events', function() {
	  it('should return a new event', function() {
			let event = composeEvent();

			var options = {
	      method: 'POST',
	      uri: `${core.urls.evently}/events`,
	      body: event,
	      json: true
	    }

			return rp(options).should.eventually.have.property("_id");
	  });
	});

});