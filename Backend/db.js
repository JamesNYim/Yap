const Pool = require("pg").Pool;
// Establishing credentials to access database
const pool = new Pool({
    user: "sahilkonjarla",
    password: "",
    host: "localhost",
    port: 5432,
    database: "Yap"
});

module.exports = pool
