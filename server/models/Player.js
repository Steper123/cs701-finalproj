/* eslint-disable camelcase */
const { Model } = require("objection");

class Player extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Player";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        teamId: { type: "integer" },
        name: { type: "string" },
        height: { type: "integer" },
        weight: { type: "integer" },
        position: { type: "integer" }


      }
    };
  }

}

module.exports = Player;
