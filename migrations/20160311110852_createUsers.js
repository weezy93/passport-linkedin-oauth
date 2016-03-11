
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.integer('linkedin_id');
    table.string('email');
    table.string('preferred_name');
    table.string('last_name');
    table.text('avatar_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
