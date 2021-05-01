let User = require('../model/user');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const dd = require('dump-die');

exports.renderHomePage = (req, res) =>{
    res.render('home');
}

//To get user list
exports.getUserList = (req, res) => {

  let search = req.query.search;
  let columnName = req.query.columnName;
  
  var whereStatement = {};
  if (req.query.search) {
      whereStatement[columnName] = {
          [Op.like]: '%' + search + '%'
      };
  }

  let sortby = req.query.sortby || 'firstname'; // page number

console.log(sortby);
  User.findAndCountAll().then((data) => {
      let limit = 2; // number of records per page
      let offset = 0;
      let page = req.params.page_no|| 1; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      User.findAll({
          where: whereStatement,
          limit: limit,
          offset: offset,
          order:[[sortby, 'ASC']]
      }).then(function(result) {
          res.render('user-list', {
              title: 'Aexo Users',
              users: result,
              'current': page,
              'pages': pages,
              'sortby': sortby
          });
      });
  });
}

