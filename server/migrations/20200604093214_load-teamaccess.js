
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('TeamAccess', (table) => {
    table.increments('id').primary();
    table.integer('userId');
    table.integer('teamId');
    table.integer('type');
    table.string('endDate');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('TeamAccess');
};
