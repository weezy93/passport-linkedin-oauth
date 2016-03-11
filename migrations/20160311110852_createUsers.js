
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.string('linkedin_id');
    table.string('email');
    table.string('displayName');
    table.string('familyName');
    table.text('photo');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
