const Sequelize = require('sequelize');
const db = require('../config/db');

const Profile = db.define('tbl_Shop', {
    user: {
        type: Sequelize.UUID,
        references: {tableName:'tbl_Users'},
        referenceKey: 'id'
    },
    shop_url: {
        type: String
    },
    shop_name: {
        type: String
    }
}, {
        timestamps: false, 
        freezeTableName: true
    }
);


module.exports = Profile;