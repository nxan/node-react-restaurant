const mssql = require('mssql');

const db = new mssql.ConnectionPool({
    user: "nxan",
    password: "Nguyenxuanan1811",
    server: "nxan.database.windows.net",
    database: "Restaurant",
    port: 1433,
    encrypt: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mssql connected...")
});

module.exports = db;