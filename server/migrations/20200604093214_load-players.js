
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Player', (table) => {
    table.increments('id').primary();
    table.string('teamId');
    table.integer('name');
    table.integer('height');
    table.integer('weight');
    table.integer('position');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Player');
};
