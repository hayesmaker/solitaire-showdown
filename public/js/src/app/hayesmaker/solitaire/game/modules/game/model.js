define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var GameModel = Class.extend({

      constructor: function(controller) {
        this.controller = controller;
      }

    });

    return GameModel;
  });