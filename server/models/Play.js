/* eslint-disable camelcase */
const { Model } = require("objection");

class Play extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Play";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        inningId: { type: "integer" },
        pitcherId: { type: "integer" },
        hitterId: { type: "integer" },
        pitchType: { type: "string" },
        pitchSpeed: { type: "integer" },
        pitchLocation: { type: "integer" },
        hitterResult: { type: "string" }



      }
    };
  }

}

module.exports = Play;
