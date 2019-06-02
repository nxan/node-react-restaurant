const Sequelize = require('sequelize');
const db = require('../config/db');


const Food = db.define('tbl_MonAn', {
    MaMon: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenMon: {
        type: Sequelize.STRING
    },
    IDNhom: {
        type: Sequelize.INTEGER
    },
    HienThi: {
        type: Sequelize.STRING
    },
    DonVi: {
        type: Sequelize.INTEGER
    },
    DonGiaBan: {
        type: Sequelize.DOUBLE
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Food;