
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Inning', (table) => {
    table.increments('id').primary();
    table.integer('gameId');
    table.integer('pitchingId');
    table.integer('hittingId');
    table.integer('number');
    table.integer('hits');
    table.integer('runs');
    table.integer('balls');
    table.integer('strikes');
    table.integer('outs');
    table.integer('firstRunnerId');
    table.integer('secondRunnerId');
    table.integer('thirdRunnerId');
    table.integer('ifPaused');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Inning');
};
