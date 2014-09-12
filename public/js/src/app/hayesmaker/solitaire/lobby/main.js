define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class) {

    var Main = Class.extend({

      constructor: function() {
        console.log('Lobby entry point');

      },

      init: function(game, cloakService) {
        this.game = game;


        //this.game.state.start('lobby');
      },

      preload: function() {
        console.log('{LobbyMain} :: preload');
      },

      create: function() {
        console.log('{LobbyMain} :: create');
      },

      update: function() {
        //console.log('{LobbyMain} :: update');

      },
      render: function() {
        //console.log('{LobbyMain} :: render');

      }

    });

    return Main;
  });