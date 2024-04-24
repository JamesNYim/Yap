const Pool = require("pg").Pool;
const pool = new Pool({
    user: "sahilkonjarla",
    host: "localhost",
    port: "5432",
    database: "Yap"
})

module.exports(pool);