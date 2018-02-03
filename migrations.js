exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('full_name');
    table.string('email');
    table.string('username');
    table.string('password_hash');
    table.string('phone_number');
    table.string('created_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};