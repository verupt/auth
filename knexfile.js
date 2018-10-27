module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/verupt',
    migrations: {
      directory: __dirname + '/lib/db/migrations'
    },
    seeds: {
      directory: __dirname + '/lib/db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/lib/db/migrations'
    },
    seeds: {
      directory: __dirname + '/lib/db/seeds'
    }
  }
}