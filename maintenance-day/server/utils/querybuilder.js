



{"Paths":{"/Values/{id}": {
  "get": {
    "tags": [
      "Values"
    ],
    "summary": "Returns the Value with the Id provided.",
    "operationId": "Values_RetrieveById",
    "consumes": [],
    "produces": [
      "application/json",
      "text/json",
      "application/xml",
      "text/xml"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "description": "Id of the Value requested.  Must be double URL encoded.",
        "required": true,
        "type": "string"
      }
    ],
    "responses": {
      "200": {
        "description": "Action successful.",
        "schema": {
          "$ref": "#/definitions/ValueModel"
        }
      }
    }
  }
},}}