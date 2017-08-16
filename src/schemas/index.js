const Validator = require("jsonschema").Validator;

let validator = new Validator();

let personSchema = {
	"id": "/Person",
	"type": "object",
	"properties": {
		"id": {
			"type": "string",
			"required": true,
			"minLength": 1,
			"maxLength": 25
		},
		"name": {
			"type": "string",
			"required": true,
			"minLength": 1,
			"maxLength": 25
		}
	}
}

let eventSchema = {
	"id": "/Event",
	"type": "object",
	"properties": {
			"secondId": {
				"type": "string",
				"minLength": 1,
				"maxLength": 25
			},
			"thirdId": {
				"type": "string",
				"minLength": 1,
				"maxLength": 25
			},
			"title": {
				"type": "string",
				"required": true,
				"minLength": 1,
				"maxLength": 25
			},
			"slots": {
				"type": "number",
				"required": true,
				"minimum": 1,
				"maximum": 100
			},
			"startTime": {
				"type": "number",
				"required": true
			},
			"participants": {
				"type": "array",
				"items": {
					"$ref": "/Person",
				}
			},
			"owner": {
				"required": true,
				"$ref": "/Person"
			},
			"webhoook": {
				"type": "string",
				"minLength": 1,
				"maxLength": 25
			}
	}
}

validator.addSchema(personSchema, "/Person");

validator.validate(event, eventSchema);