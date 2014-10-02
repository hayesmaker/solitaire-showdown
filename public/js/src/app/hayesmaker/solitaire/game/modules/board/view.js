define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/view',
    'components/card'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View, Card) {

    var BoardView = View.extend({

      constructor: function(controller) {
        View.super.constructor.call(this, controller);
      },

      drawRowStacks: function(rowStacksModel) {

      }




    });

    return BoardView;
  });