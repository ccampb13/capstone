'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
  res.render('users/login', {title: 'Login'});
};

exports.register = (req, res)=>{
  res.render('users/register', {title: 'Register'});
};

exports.authenticate = (req, res)=>{
  User.login(req.body, user=>{
    if(user){
      req.session.userId = user._id;
      res.redirect('users/show');
    }else{
      req.session = null;
      res.redirect('/login');
    }
  });
};

exports.validate = (req, res)=>{
  User.create(req.body, user=>{
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.verify = (req, res)=>{
  User.findById(req.params.id, u=>{
    res.render('users/verify', {u:u, title: 'User Verification'});
  });
};

exports.password = (req, res)=>{
  User.findById(req.params.id, user=>{
    user.changePassword(req.body.password, ()=>res.redirect('/login'));
  });
};

exports.lookup = (req, res, next)=>{
  User.findById(req.session.userId, user=>{
    if(user){
      res.locals.user = user;
    }

    next();
  });
};

exports.bounce = (req, res, next)=>{
  if(res.locals.user){
    next();
  }else{
    res.redirect('/login');
  }
};

exports.logout = (req, res)=>{
  req.session = null;
  res.redirect('/');
};

exports.show = (req, res)=>{
  User.findById(req.params.userId, user=>{
    res.render('users/show' , {showUser:user, title: 'Profile Page'});
  });
};

exports.edit = (req, res)=>{
  User.findById(req.params.userId, user=>{
    res.render('users/edit', {user:user, title: 'Edit Profile'});
  });
};
