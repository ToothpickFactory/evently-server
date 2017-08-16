const eventSchema = {
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

module.exports = eventSchema;