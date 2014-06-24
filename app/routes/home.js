'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Workmates'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'Workmates'});
};

exports.contact = (req, res)=>{
  res.render('home/contact', {title: 'Workmates'});
};

exports.trust = (req, res)=>{
  res.render('home/trust', {title: 'Workmates'});
};
