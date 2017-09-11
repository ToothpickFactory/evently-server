const config			= require("config");
const express			= require("express");
const app           	= express();
const bodyParser	  	= require('body-parser');
const cors          	= require('cors');
const Mongo         	= require('./connections/mongo');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Mongo.getDB()
	.then(() => {
		require('./api')(app);
		require('./crons');
		app.listen(config.port, () => { console.log(`Evently running on port: ${config.port}`) });
	})
	.catch(() => console.log('Server was unable to start'))


