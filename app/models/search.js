/* jshint unused:false */

'use strict';

var userCollection = global.nss.db.collection('users');
var traceur = require('traceur');
var Base =  traceur.require(__dirname + '/base.js');

class Search {


  static findAllUsers(fn){
    Base.findAll(userCollection, Search, allUsers=>{
      fn(allUsers);
    });
  }




}

module.exports = Search;
