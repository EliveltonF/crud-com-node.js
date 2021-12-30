// Update with your config settings.
const {knexSnakeCaseMappers} = require('objection')

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '1234',
      database: 'desafio_vo'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    ...knexSnakeCaseMappers,
  },

}