define(
  [
    'lodash',
    'class',
    'cloak',
    'signals',
    'components/user'
  ],
  function(_, Class, cloak, Signal, User) {

    var socketService = Class.extend({

      constructor: function(){

        this.user = new User();
        this.roomPlayers = [];
        this.roomPlayerJoined = new Signal();
        this.gameStarted = new Signal();
        this.gameMove = new Signal();
        this.cardsDrawn = new Signal();
      },

      init: function() {

        var self = this;

        cloak.configure({

          messages: {
            gameStarted: function(data)
            {
              var currentUser = cloak.currentUser();
              console.log('{Cloak} :: gameStarted :: cloak.currentUser=', currentUser);
              var i, len = data.users.length;
              self.user.setId(currentUser);

              for (i = 0; i < len; i++)
              {
                if (self.roomPlayers.indexOf(data.users[i].id) < 0)
                {
                  self.roomPlayers.push(data.users[i]);
                  if (data.users[i].id === currentUser)
                  {
                    console.log('{Cloak} :: setting Player Number: ', (i+1));
                    self.user.setPlayerNum(i+1);
                  }

                  self.roomPlayerJoined.dispatch(data.users[i], i, currentUser);
                }
              }
              self.gameStarted.dispatch(data.gameData);
            },

            gameMove: function(data)
            {
              console.log('{Cloak} :: gameMove :: data=', data);
              self.gameMove.dispatch(data);
            },

            drawCards: function(data)
            {
              console.log('{Cloak} :: drawCards :: data=', data);
              self.cardsDrawn.dispatch(data);
            }
          },



          serverEvents: {
            connecting: function() {
              console.log('{Cloak} :: Connecting');
            },

            begin: function() {
              console.log('{Cloak} :: First Connection Mofo :: cloak=', cloak);
            },

            resume: function() {
              console.log('{Cloak} :: Connection Resumed');
            },

            end: function() {
              console.log('{Cloak} :: Disconnected')
            },

            error: function(err) {
              console.log('{Cloak} :: Error ::', err);
            },

            joinedRoom: function(room)
            {
              console.log('{Cloak} :: joinedRoom :: room=', room);
            }

          }
        });
      },

      /**
       *
       * @param name
       * @param player
       * @param dropStackIndexFrom
       * @param fromType
       * @param dropStackIndexTo
       * @param type
       */
      sendMove: function(name, player, dropStackIndexFrom, fromType, dropStackIndexTo, toType, hasPile) {
        //cloak.message('sendMove', name + '::' + player + '::' + dropStackIndexFrom + '::' + fromType + '::' + dropStackIndexTo + '::' + toType);

        var obj = {
          name: name,
          player: player,
          dropFromIndex: dropStackIndexFrom,
          dropFromType: fromType,
          dropToIndex: dropStackIndexTo,
          dropToType: toType,
          includePile: hasPile
        };

        cloak.message('sendMove', obj);

      },

      draw3Cards: function(data) {
        console.log('{Cloak} :: SEND :: draw3 ::', data.player);
        cloak.message('draw3Cards', data.player);
      },

      testSendObject: function(arg) {
        console.log('{Cloak} :: SEND :: testSendObject :: ', arg);
        cloak.message('sendObj', arg);
      },


      connect: function() {
        cloak.run('http://localhost:3000');
      }

    });

    return socketService;
  });