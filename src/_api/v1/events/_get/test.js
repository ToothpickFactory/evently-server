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

describe('Get Events', function() {

	before(() => generateEvent());
	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#GET /events', function() {
	  it('should return a list of events', function() {
			return chai.request(core.urls.evently)
				.get(`/events/`)
				.then(res => {
					expect(res.body).to.be.an("array");
				});
	  });
	});

});