const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');

var User = sequelize.define('users', {
    firstname:Sequelize.STRING,
    lastname:Sequelize.STRING,
    email:Sequelize.STRING,
    emp_id:Sequelize.INTEGER,
    password:Sequelize.STRING,
    org_name:Sequelize.STRING
});


module.exports = User;
