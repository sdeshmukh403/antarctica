let User = require('../model/user');
let bcrypt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');
const dd = require('dump-die');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

exports.checkLogined = (req, res, next) => {
  if (req.url === '/signup' || req.url === '/login') {
      if (localStorage.getItem('userToken')) {
          res.redirect('/')
      }
      return next();
  }
  if (localStorage.getItem('userToken')) {
      next();
  } else {
      res.redirect('/login');
  }
}

exports.getLogout = (req, res) => {
  localStorage.removeItem('userToken');
  res.redirect('/login');

}

exports.getDashboard = (req, res) =>{
  res.render('home');
}

exports.getLogin = (req, res) => {
  res.render('login', {title:'Login'})
}

exports.postLogin = (req, res) => {

  User.findAll({
      attributes: ['password', 'id'],
      raw: true,
      where: [{
          email: req.body.email
      }]
  }).then(result => {

    if (bcrypt.compareSync(req.body.password, result[0].password)) {
          var token = jwt.sign({
              userId: result[0].id
          }, 'loginToken');

          localStorage.setItem('userToken', token)
          localStorage.setItem('loginUser', req.body.email)
          
          res.redirect('/');
         // res.send("you are loggin successfully");
      }
      res.send("Credentials are invalid");
  });
}

exports.getSignup = (req, res) => {
  res.render('signup', {
      title: 'Signup',
      errs: ''
  });
}


exports.postSignup = (req, res, next) => {

  User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      emp_id: req.body.emp_id,
      org_name: req.body.org_name,
      password: bcrypt.hashSync(req.body.password, 10)
  }).then(result => {
    res.redirect('/login');

  }).catch(err => {
      return res.render('signup', {
          title: 'aexo signup',
          errs: err.errors
      });
  });

}
