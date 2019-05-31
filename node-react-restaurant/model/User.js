const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('tbl_Users', {
    email: {
        type: String,
        primaryKey: true
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
User.removeAttribute('id');


module.exports = User;