/* eslint-disable camelcase */
const { Model } = require("objection");

class Inning extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Inning";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        gameId: { type: "integer" },
        pitchingId: { type: "integer" },
        hittingId: { type: "integer" },
        number: { type: "integer" },
        runs: { type: "integer" },
        hits: { type: "integer" },
        balls: { type: "integer" },
        strikes: { type: "integer" },
        outs: { type: "integer" },
        firstRunnerId: { type: "integer" },
        secondRunnerId: { type: "integer" },
        thirdRunnerId: { type: "integer" },
        ifPaused: { type: "integer" }

      }
    };
  }

}

module.exports = Inning;
