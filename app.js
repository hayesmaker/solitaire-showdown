
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
var Game = require('./classes/Game');




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

  autoCreateRooms: true,

  minRoomMembers: 2,

  defaultRoomSize: 2,

  roomLife: null,

  room: {
    init: function() {
      this.game = new Game();
      this.game.init();

    },
    newMember: function(user) {
      console.log('**************');
      console.log('****GAME START ****');
      console.log('**************');
      console.log('game pack=', this.game.pack);
      user.message('gameStarted', {
        users: this.cloak.getUsers(true),
        gameData: this.game
      });
    }
  },

  lobby : {
    newMember: function(user)
    {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('Lobby New Member :: Waiting for players', this.cloak.getUsers(true));
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');


      //this.cloak.messageAll('getAllMembers', this.cloak.getUsers(true));
      //user.cloak.getLobby().messageMembers('getAllMembers', user.cloak.getUsers());
    }
  },

  messages: {
    sendMove: function(arg, user) {
      console.log('{RECEIVED} sendMoveObj ::', arg);
      user.getRoom().game.move(arg);

    },

    draw3Cards: function(arg, user) {
      user.getRoom().game.draw3Cards(arg);
    },

    sendObj: function(arg, user) {
      console.log('{RECEIVED} sendObj ::', arg);
    }
  }
});

cloak.run();
