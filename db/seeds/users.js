
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_credentials').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_credentials').insert([
        {id: 1, username: 'alice', hash: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6'},
        {id: 2, username: 'bob', hash: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6'},
        {id: 3, username: 'eve', hash: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6'}
      ]);
    });
};
