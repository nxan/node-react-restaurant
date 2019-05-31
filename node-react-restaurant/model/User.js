const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('tbl_Users', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
}, {
        timestamps: false
    }
);


module.exports = User;