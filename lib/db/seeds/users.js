
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_credentials').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_credentials').insert([
        {username: 'alice@email.com', hash: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6'},
        {username: 'bob@email.com', hash: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6'},
        {username: 'eve@email.com', hash: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6'}
      ]);
    });
};
