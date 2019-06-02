const Sequelize = require('sequelize');
const db = require('../config/db');


const Order = db.define('BH_tbd_BanHangLyLich', {
    SOHOADON: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    NGAYHOADON: {
        type: Sequelize.STRING
    },
    INHOADON: {
        type: Sequelize.STRING
    },
    MaBan: {
        type: Sequelize.INTEGER
    },
    GIOVAO: {
        type: Sequelize.STRING
    },
    GIORA: {
        type: Sequelize.STRING
    },
    KETTHUC: {
        type: Sequelize.STRING
    },
    TRANGTHAI: {
        type: Sequelize.STRING
    },
    MaNhanVienBan: {
        type: Sequelize.STRING
    },
    NgayCr: {
        type: Sequelize.STRING
    },
    HostName: {
        type: Sequelize.STRING
    },
    MaGiam: {
        type: Sequelize.INTEGER
    },
    Huy: {
        type: Sequelize.INTEGER
    },
    TongMon: {
        type: Sequelize.INTEGER
    }
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Order;