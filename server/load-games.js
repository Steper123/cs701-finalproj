/* eslint-disable func-names */
const fs = require("fs");

exports.seed = function(knex) {
  const contents = fs.readFileSync("seed_games.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex("Game")
    .del()
    .then(() => knex.batchInsert("Game", data, 5));
};
