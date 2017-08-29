const config					= require("config");
const express					= require("express");
const app           	= express();
const bodyParser	  	= require('body-parser');
const cors          	= require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./api')(app);
require('./crons');

app.listen(config.port, () => { console.log(`Sample App listing on port: ${config.port}`) });
