'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.index = (req, res)=>{
  User.findById(req.session.userId, user=>{
    res.render('dashboard/index', {user:user, title: 'Dashboard'});
  });
};
