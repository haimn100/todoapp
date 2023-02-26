module.exports = {
        development: {
        client: 'sqlite3',
        connection: {
            filename: "./data/todos.db3"
        },
        migrations: {
            directory: './data/migrations',
            disableMigrationsListValidation: true,
        },
        useNullAsDefault: true
    }
}