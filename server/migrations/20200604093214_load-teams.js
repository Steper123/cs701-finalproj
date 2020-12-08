
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Team', (table) => {
    table.increments('id').primary();
    table.string('location');
    table.string('name');
    table.string('division');
    table.string('coach');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Team');
};
