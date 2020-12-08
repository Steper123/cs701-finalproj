
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('Lineup', (table) => {
    table.increments('id').primary();
    table.integer('teamId');
    table.integer('gameId');
    table.integer('firstId');
    table.integer('firstPos');
    table.integer('secondId');
    table.integer('secondPos');
    table.integer('thirdId');
    table.integer('thirdPos');
    table.integer('fourthId');
    table.integer('fourthPos');
    table.integer('fifthId');
    table.integer('fifthPos');
    table.integer('sixthId');
    table.integer('sixthPos');
    table.integer('seventhId');
    table.integer('seventhPos');
    table.integer('eighthId');
    table.integer('eighthPos');
    table.integer('ninthId');
    table.integer('ninthPos');
    table.integer('pitcher');

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Lineup');
};
