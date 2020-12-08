/* eslint-disable camelcase */
const { Model } = require("objection");

class Game extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Game";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        homeId: { type: "integer" },
        awayId: { type: "integer" },
        scorerId: { type: "integer" },
        complete: { type: "integer" }


      }
    };
  }

}

module.exports = Game;
