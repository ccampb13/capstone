'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
// var multiparty = require('multiparty');
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
    console.log(u);
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
  User.findById(req.params.id, user=>{
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

// exports.addPhoto = (req, res)=>{
//   var form = new multiparty.Form();
//
//     form.parse(req, (err, fields, files)=>{
//
//       if(!fs.existsSync(`${__dirname}/../static/img/${fields.name[0]}`)){
//         var user = {};
//         user.name = fields.name[0];
//
//          files.photo.forEach(p=>{
//             fs.mkdirSync(`${__dirname}/../static/img/${fields.name[0]}`);
//             fs.renameSync(p.path, `${__dirname}/../static/img/${fields.name[0]}/${p.originalFilename}`);
//             user.photo = (p.originalFilename);
//         });
//
//           userCollection.save(user, ()=>res.redirect(`/users/${user._id}`));
//         }else{
//             res.redirect('/');
//           }
//   });
// };
  // User.findById(req.params.id, user=>{
  //     var form = new multiparty.Form();
  //     form.parse(req, (err, fields, files)=>{
  //       user.addPhoto(files.photos, ()=>res.redirect(`/users/${user._id}`));
  //   });
  // });
