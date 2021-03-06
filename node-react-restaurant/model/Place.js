const Sequelize = require('sequelize');
const db = require('../config/db');


const Place = db.define('tbl_Khu', {
    MaKhu: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenKhu: {
        type: String
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Place;