module.exports = {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DATABASE_URL,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}
