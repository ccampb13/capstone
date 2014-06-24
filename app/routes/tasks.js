'use strict';

exports.index = (req, res)=>{
  res.render('tasks/index', {title: 'Tasks'});
};

exports.new = (req, res)=>{
  res.render('tasks/new', {title: 'Tasks'});
};
