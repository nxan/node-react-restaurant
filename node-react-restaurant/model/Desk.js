const Sequelize = require('sequelize');
const db = require('../config/db');


const Desk = db.define('tbl_Ban', {
    MaBan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenBan: {
        type: Sequelize.STRING
    },
    HienThi: {
        type: Sequelize.BOOLEAN
    },
    Khu: {
        type: Sequelize.INTEGER
    },
    TongMon: {
        type: Sequelize.INTEGER
    },
    GIOVAO: {
        type: Sequelize.DATE
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Desk;