
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Play', (table) => {
    table.increments('id').primary();
    table.integer('inningId');
    table.integer('pitcherId');
    table.integer('hitterId');
    table.string('pitchType');
    table.integer('pitchSpeed');
    table.integer('pitchLocation');
    table.string('hitterResult');

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Play');
};
