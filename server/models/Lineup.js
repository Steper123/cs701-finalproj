/* eslint-disable camelcase */
const { Model } = require("objection");

class Lineup extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Lineup";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        teamId: { type: "integer" },
        gameId: { type: "integer" },
        firstId: { type: "integer" },
        firstPos: { type: "integer" },
        secondId: { type: "integer" },
        secondPos: { type: "integer" },
        thirdId: { type: "integer" },
        thirdPos: { type: "integer" },
        fourthId: { type: "integer" },
        fourthPos: { type: "integer" },
        fifthId: { type: "integer" },
        fifthPos: { type: "integer" },
        sixthId: { type: "integer" },
        sixthPos: { type: "integer" },
        seventhId: { type: "integer" },
        seventhPos: { type: "integer" },
        eighthId: { type: "integer" },
        eighthPos: { type: "integer" },
        ninthId: { type: "integer" },
        ninthPos: { type: "integer" },
        pitcher: { type: "integer" }

      }
    };
  }

}

module.exports = Lineup;
