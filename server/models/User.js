/* eslint-disable camelcase */
const { Model } = require("objection");

const TeamAccess = require("./TeamAccess");

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "User";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        username: { type: "string" },
        password: { type: "string" },
        signedIn: { type: "integer" }
      }
    };
  }

  static get relationMappings() {
    return {
      accesspoints: {
        relation: Model.HasManyRelation,
        modelClass: TeamAccess,
        join: {
          from: "User.id",
          to: "TeamAccess.userId"
        }
      }
    };
  }

}

module.exports = User;
