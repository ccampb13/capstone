var bcrypt = require('bcrypt');
var request = require('request');
var userCollection = global.nss.db.collection('users');
var Mongo = require('mongodb');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var fs = require('fs');
// var path = require('path');
// var crypto = require('crypto');


class User{
  static create(obj,fn){
    userCollection.findOne({email:obj.email}, (e,u)=>{
      if(u){
        fn(null);
      }else{
        var user = new User();
        user._id = Mongo.ObjectID(obj._id);
        user.email = obj.email;
        user.password = '';
        user.isValid = false;
        user.name = obj.name;
        user.gender = obj.gender;
        user.streetName = obj.streetName;
        user.city = obj.city;
        user.state = obj.state;
        user.zipcode = obj.zipcode;
        user.latlong = [];
        user.age = '';
        user.isNeeding = false;
        user.isHelp = false;
        user.experience = '';
        user.bio ='';
        user.photos = [];


        userCollection.save(user, ()=>{
          sendVerificationEmail(user, fn);
        });
      }
    });
  }

  save(fn){
    userCollection.save(this, ()=>fn());
  }

  addPhotos(photos){
    photos.forEach((p,i)=>{
      var photo = {};
      photo.fileName = p.originalFilename;
      photo.path = `/img/${this._id}/${photo.fileName}`;
      if(i){
        photo.isPrimary = false;
      } else {
        photo.isPrimary = true;
      }
      this.photos.push(photo);
      mkdirp(`${__dirname}/../static/img/${this._id}/`);
      fs.renameSync(p.path, __dirname+'/../static/img/'+ this._id + '/' + photo.fileName);
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

  isOwner(user){
    console.log('________________________');
    console.log(user);
    return user._id.toString() === this._id.toString();
  }


  update(obj, fn){
    this.name = obj.name;
    this.email = obj.email;
    this.zipcode = obj.zipcode;
    this.age = obj.age;
    this.bio = obj.bio;
    this.experience = obj.experience;



    userCollection.save(this, ()=>fn());
  }


  changePassword(password, fn){
    this.password = bcrypt.hashSync(password, 8);
    this.isValid = true;


    userCollection.save(this, fn);
  }

  findParams(fn){
    var searchParams = {};
    searchParams.zipcode  = this.zipcode;
    fn(searchParams);
  }

  findMatches(params, fn){
    var user = this;
    var zipcode = params.zipcode;
    console.log('------ZIPCODE------');
    console.log(zipcode);
    console.log('------THIS------');
    console.log(this);
    userCollection.find({_id: {$ne: user._id}, zipcode: zipcode}).toArray((e, users)=>{
      users = users.map(u=>_.create(User.prototype, u));
        fn(users);
    });
  }


  static findById(id, fn){
    Base.findById(id, userCollection, User, fn);
  }

  static findIdByUserName(name, fn){
    userCollection.findOne({name:name}, (e, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
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
  form.append('from', 'admin@workmates.com');
  form.append('to', user.email);
  form.append('subject', 'Please verify your email address on Workmates');
  form.append('html', `<a href="http://workmates.chadcampbell.info/verify/${user._id}">Click to Verify</a>`);
}

module.exports = User;
