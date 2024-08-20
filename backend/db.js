const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "jnyim",
    password: "jnyim!",
    host: "localhost",
    port: 5432,
    database: "yap"
});

module.exports = pool; 
