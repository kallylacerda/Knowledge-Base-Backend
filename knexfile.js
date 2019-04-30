// Update with your config settings.
const { db } = require('./.env');

// module.exports = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//     client: 'postgresql',
//     connection: db,
//     pool: {
//         min: 2,
//         max: 10
//     },
//     migrations: {
//         tableName: 'knex_migrations'
//     }

// };

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: __dirname + '/migrations',
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/migrations',
        },
        ssl: true
    },
};
