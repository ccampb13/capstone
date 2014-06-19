'use strict';

exports.index = (req, res)=>{
  res.render('tasks/index', {title: 'Tasks'});
};
