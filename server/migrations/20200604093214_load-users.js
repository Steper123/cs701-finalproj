
/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('User', (table) => {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
    table.integer('signedIn');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('User');
};
