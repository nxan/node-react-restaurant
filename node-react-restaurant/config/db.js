const Sequelize = require('sequelize');

const db = new Sequelize('Restaurant', 'nxan', 'Nguyenxuanan1811', {
    dialect: 'mssql',
    host: 'nxan.database.windows.net',
    port: 1433,
    timestamps: false,
    dialectOptions: { options: { encrypt: true } }
});

module.exports = db;