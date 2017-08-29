const appRootDir			= require('app-root-dir').get();
const chai            = require("chai");
const chaiAsPromised  = require("chai-as-promised");
const expect          = chai.expect;
const chaiHttp				= require('chai-http');

const core = require(appRootDir + "/src/test/testData/core.json");
const generateEvent = require(appRootDir + "/src/test/helpers/generateEvent");
const removeEventTests = require(appRootDir + "/src/test/helpers/removeEventTests");

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