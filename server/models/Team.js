/* eslint-disable camelcase */
const { Model } = require("objection");

class Team extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Team";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        location: { type: "string" },
        name: { type: "string" },
        division: { type: "string" },
        coach: { type: "string" }

      }
    };
  }

}

module.exports = Team;
