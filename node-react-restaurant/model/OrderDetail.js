const Sequelize = require('sequelize');
const db = require('../config/db');


const OrderDetail = db.define('BH_tbd_BanHangChiTiet', {
    IDBanChiTiet: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SOHOADON: {
        type: Sequelize.BIGINT
    },
    MaMon: {
        type: Sequelize.INTEGER
    },
    SoLuongTra: {
        type: Sequelize.DOUBLE
    },
    SoLuong: {
        type: Sequelize.DOUBLE
    },
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = OrderDetail;