const Sequelize = require('sequelize');
const db = require('../config/db');


const GroupFood = db.define('tbl_Nhom', {
    IDNhom: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenNhom: {
        type: String
    },
    HienThi: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = GroupFood;