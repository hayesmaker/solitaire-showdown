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
        this.lobbyPlayerJoined = new Signal();
      },

      init: function() {

        var self = this;

        cloak.configure({
          messages: {
            bar: function(arg) {
              console.log('bar from server', arg);
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

            lobbyMemberJoined: function(arg) {
              var id = arg.id;
              var name = arg.name;
              console.log('{Cloak} :: Player Joined Lobby :: ', id, name);

              self.lobbyPlayerJoined.dispatch({id: id, name: name});
            },

            getAllMembers: function(users)
            {
              console.log('{Cloak} :: getAllMembers :: users=', users);
            }
          }
          //add
        });
      },

      connect: function() {
        cloak.run('http://localhost:3000');
      }
    });

    return socketService;
  });