define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View) {

    var GameView = View.extend({

      constructor: function(controller) {
        View.super.constructor.call(this, controller);
      }



    });

    return GameView;
  });