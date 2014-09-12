define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var Module = Class.extend({

      constructor: function() {

      },

      init: function(game) {
        this.game = game;
      }

    });

    return Module;
  });
