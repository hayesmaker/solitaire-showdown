define(
  [
    'lodash',
    'class',
    'cloak',
    'signals'
  ],
  function(_, Class, cloak, Signal) {

    var socketService = Class.extend({

      constructor: function(){
        this.lobbyPlayers = [];
        this.lobbyPlayerJoined = new Signal();
        this.gameStarted = new Signal();
      },

      init: function() {

        var self = this;

        cloak.configure({

          messages: {

            gameStarted: function(data)
            {
              console.log('{Cloak} :: gameStarted :: ', data);
              var i, len = data.users.length;
              for (i = 0; i < len; i++)
              {
                if (self.lobbyPlayers.indexOf(data.users[i].id) < 0)
                {
                  self.lobbyPlayers.push(data.users[i]);
                  self.lobbyPlayerJoined.dispatch(data.users[i]);
                }
              }
              self.gameStarted.dispatch(data.gameData);
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
            }

          }
        });
      },

      sendMove: function(dropStack, card, player) {
        console.log('{Cloak} sendMove : ', card, player);
        cloak.message('sendMove', card.name + "::" + player + "::" + dropStack.index);
      },

      connect: function() {
        cloak.run('http://localhost:3000');
      }
    });

    return socketService;
  });