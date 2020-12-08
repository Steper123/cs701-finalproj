
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Game', (table) => {
    table.increments('id').primary();
    table.integer('homeId');
    table.integer('awayId');
    table.integer('scorerId');
    table.integer('complete');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Game');
};
