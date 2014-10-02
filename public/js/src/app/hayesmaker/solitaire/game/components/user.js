define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signal) {

    var User = Class.extend({

      constructor: function() {
        this.id = null;
        this.playerNum = 0;
      },

      setId: function(id) {
        this.id = id;
      },

      setPlayerNum: function(playerNum) {
        this.playerNum = playerNum;
      },

      isMeByPlayerNum: function(playerNum) {
        return playerNum === this.playerNum;
      },

      isMeById: function(id) {
        return id === this.id;
      }

    });

    return User;
  });

