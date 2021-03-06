// Update with your config settings.

module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./midd-baseball-test.db"
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./seeds/test"
    }
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './midd-baseball.db'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
