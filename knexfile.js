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
            host: '127.0.0.1',
            user: process.env.TODO_DB_USER,
            password: process.env.TODO_DB_PW,
            database: 'knowledge'
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
