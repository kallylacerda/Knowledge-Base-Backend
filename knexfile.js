// Update with your config settings.
const { db } = require('./.env');

module.exports = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    client: 'postgresql',
    connection: db,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }

};
