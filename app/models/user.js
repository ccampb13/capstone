var bcrypt = require('bcrypt');
var request = require('request');
var userCollection = global.nss.db.collection('users');
// var Mongo = require('mongodb');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

class User{
  static create(obj, fn){
    userCollection.findOne({email:obj.email}, (e,u)=>{
      if(u){
        fn(null);
      }else{
        var user = new User();
        user.email = obj.email;
        user.password = '';
        user.isValid = false;

        userCollection.save(user, ()=>{
          sendVerificationEmail(user, fn);
        });
      }
    });
  }

  static login(obj, fn){
    userCollection.findOne({email:obj.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(obj.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
        fn(null);
      }
    });
  }

   changePassword(password, fn){
    this.password = bcrypt.hashSync(password, 8);
    this.isValid = true;

    userCollection.save(this, fn);
  }

  static findById(id, fn){
    Base.findById(id, userCollection, User, fn);
  }
}

function sendVerificationEmail(user, fn){
  'use strict';

  var key = process.env.MAILGUN;
  var url = 'https://api:' + key + '@api.mailgun.net/v2/sandbox69363fbad32849af878ec54a10452703.mailgun.org/messages';
  var post = request.post(url, function(err, response, body){
    fn(user);
  });

  var form = post.form();
  form.append('from', 'admin@capstone.com');
  form.append('to', user.email);
  form.append('subject', 'Please verify your email address on Capstone');
  form.append('html', `<a href="http://localhost:4000/verify/${user._id}">Click to Verify</a>`);
}

module.exports = User;
