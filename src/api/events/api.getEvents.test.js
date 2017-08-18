const chai            = require("chai"),
      chaiAsPromised  = require("chai-as-promised"),
      expect          = chai.expect,
      rp              = require('request-promise');

const core = require("../../test/testData/core.json");
const generateEvent = require("../../test/helpers/generateEvent");
const removeEventTests = require("../../test/helpers/removeEventTests");

chai.should();
chai.use(chaiAsPromised);

describe('Get Events', function() {

	before(() => generateEvent());
	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#GET /events', function() {
	  it('should return a list of events', function() {

			var options = {
	      method: 'GET',
	      uri: `${core.urls.evently}/events`,
	      json: true
			}
					
			let p = rp(options);

			return p.should.eventually.be.an('array');
	  });
	});

});