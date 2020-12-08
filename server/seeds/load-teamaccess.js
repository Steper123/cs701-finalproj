/* eslint-disable func-names */
const fs = require("fs");

exports.seed = function(knex) {
  const contents = fs.readFileSync("seed_teamaccess.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex("TeamAccess")
    .del()
    .then(() => knex.batchInsert("TeamAccess", data, 5));
};
