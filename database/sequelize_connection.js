const Sequelize = require('sequelize');
const sequelize = new Sequelize('antarctica', 'root', '', {localhost: 'localhost', dialect: 'mysql', operatorAliases: false, define: {
    timestamps: false
}});

var test = sequelize.authenticate()
    .then(function () {
        console.log("CONNECTED! ");
    })
    .catch(function (err) {
        console.log("SOMETHING DONE GOOFED");
    })
    .done();

module.exports = sequelize;     
