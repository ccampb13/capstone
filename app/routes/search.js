/* jshint unused: false */
'use strict';
var traceur = require('traceur');
var Search = traceur.require(__dirname + '/../models/search.js');

exports.index = (req, res)=>{
    res.locals.user.findParams(results=>{
    res.locals.user.findMatches(results, matchedUsers=>{
        res.render('search/index', {matchedUsers: matchedUsers});
    });
  });
};
//
// exports.index = (req, res)=>{
//   Search.findAllUsers(allUsers, (fn)=>{
//     console.log(allUsers);
//   });
// };

//
// var street = req.body.streetName.split(' ').map(each=>each.trim());
//     request('https://maps.googleapis.com/maps/api/geocode/json?address='+street[0]+'+'+street[1]+'+'+street[2]+',+Nashville,+TN&key=AIzaSyCCisv6D7SOLh8w4s58alflk1tk9qlCFQ0', function(err, response, body){
//     if(!err && response.statusCode === 200){
//       body = JSON.parse(body);
//       var lat = body.results[0].geometry.location.lat;
// 		  var long = body.results[0].geometry.location.lng;
//       report.latlong.push(lat, long);
//       report.save((report)=>{
//         res.render('users/report', {report:report});
//         });
//       }
//     });
//   });
// };
