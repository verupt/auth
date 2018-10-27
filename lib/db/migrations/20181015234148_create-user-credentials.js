
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_credentials', function(table){
    table.increments();
    table.string('username').unique().notNullable();
    table.string('hash').notNullable();
    table.timestamp('created').defaultTo(knex.fn.now());
    table.timestamp('updated').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_credentials');
};
