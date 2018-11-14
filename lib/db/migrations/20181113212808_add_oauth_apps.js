
exports.up = function(knex, Promise) {
  return knex.schema.createTable('oauth_applications', table => {
    table.string('id').unique().notNullable();
    table.string('application_name').notNullable();
    table.string('callback_url').notNullable();
    table.string('description');
    table.timestamp('created').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('oauth_applications');
};
