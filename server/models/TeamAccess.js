/* eslint-disable camelcase */
const { Model } = require("objection");

class TeamAccess extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "TeamAccess";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        teamId: { type: "integer" },
        type: { type: "integer" },
        endDate: { type: "string" }

      }
    };
  }

  static get relationMappings() {
    const User = require("./User"); // eslint-disable-line

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "TeamAccess.userId",
          to: "User.id"
        }
      }
    };
  }

}

module.exports = TeamAccess;
