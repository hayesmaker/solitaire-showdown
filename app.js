
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();
var cloak = require('cloak');




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



console.log('attempting to run cloak server...');



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/solitaire', function(req, res) {
  res.render('docs', { title: 'Solitaire Showdown' });
});



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

cloak.configure({
  express: server,
  messages: {
    foo: function(arg, user) {

      console.log('Connection from user.id ' + user.id);
      //console.log('Current Users: ' + cloak.getUsers());
    }
  },
  lobby : {
    newMember: function(user)
    {
      console.log('Lobby New Member', this.cloak.getLobby());
      //user.cloak.getLobby().messageMembers('getAllMembers', user.cloak.getUsers());
    }
  }
});

cloak.run();
