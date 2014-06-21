'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var messages = traceur.require(__dirname + '/../routes/messages.js');
  var dashboard = traceur.require(__dirname + '/../routes/dashboard.js');
  var search = traceur.require(__dirname + '/../routes/search.js');
  var tasks = traceur.require(__dirname + '/../routes/tasks.js');

  app.all('*', users.lookup);

  app.get('/', dbg, home.index);
  app.get('/about', dbg, home.about);
  app.get('/contact', dbg, home.contact);
  app.get('/trust', dbg, home.trust);

  app.get('/login', dbg, users.login);
  app.post('/login', dbg, users.authenticate);
  app.get('/register', dbg, users.register);
  app.post('/register', dbg, users.validate);
  app.get('/verify/:id', dbg, users.verify);
  app.post('/verify/:id', dbg, users.password);
  app.get('/users/:id', dbg, users.show);

  app.all('*', users.bounce);

  app.get('/dashboard', dbg, dashboard.index);

  app.get('/users/:id/edit', dbg, users.edit);
  app.post('/users/:id/edit', dbg, users.update);
  // app.post('/users/:id/photo', dbg, users.addPhoto);

  app.get('/messages', dbg, messages.index);
  app.post('/messages', dbg, messages.create);

  app.get('/dashboard', dbg, dashboard.index);

  app.get('/search', dbg, search.index);

  app.get('/tasks', dbg, tasks.index);

  app.post('/logout', dbg, users.logout);







  console.log('Routes Loaded');
  fn();
}
