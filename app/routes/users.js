'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var multiparty = require('multiparty');
var request = require('request');
// var userCollection = global.nss.db.collection('users');
// var fs = require('fs');

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
      res.redirect(`/users/${user._id}`);
    }else{
      req.session.userId = null;
      res.redirect('/login');
    }
  });
};

exports.validate = (req, res)=>{
  console.log(req.body);
  User.create(req.body, user=>{
      console.log('---------------');
      console.log(user);
      var street = user.streetName.split(' ').map(each=>each.trim());
      console.log(user);
      request('https://maps.googleapis.com/maps/api/geocode/json?address='+street[0]+'+'+street[1]+'+'+street[2]+',+Nashville,+TN&key=AIzaSyAmTXRHkPuPkegIsHnUZ-NRX_yrqmZIAXA', function(err, response, body){
      if(!err && response.statusCode === 200){
        body = JSON.parse(body);
        var lat = body.results[0].geometry.location.lat;
  		  var long = body.results[0].geometry.location.lng;
        user.latlong.push(lat,long);
        user.save((user)=>{
          res.redirect('/');
        });
      }
    });
  });
};

exports.verify = (req, res)=>{
  User.findById(req.params.id, u=>{
    console.log(u);
    res.render('users/verify', {u:u, title: 'User Verification'});
  });
};

exports.password = (req, res)=>{
  User.findById(req.params.id, user=>{
    user.changePassword(req.body.password, ()=>res.redirect('/login'));
  });
};

exports.editPhotos = (req, res)=>{
  res.render('users/editPhotos');
};

exports.addPhotos = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var user = res.locals.user;
    user.addPhotos(files.photos);
    user.save(()=>{
      res.redirect(`/users/${user._id}`);
    });
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
  User.findById(req.params.id, user=>{
    console.log('************************');
    console.log(user);
    res.render('users/show' , {user:user, title: 'Profile Page'});
  });
};

exports.edit = (req, res)=>{
  User.findById(req.params.id, user=>{
    res.render('users/edit', {user:user, title: 'Edit Profile'});
  });
};

exports.update = (req, res)=>{
  User.findById(req.params.id, user=>{
    user.update(req.body, ()=>res.redirect(`/users/${user._id}`));
  });
};
