define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/view',
    'modules/droppableStack/view'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View, DroppableStackView) {

    var AcePileView = DroppableStackView.extend({

      constructor: function(controller) {
        AcePileView.super.constructor.call(this, controller);
      }



    });

    return AcePileView;
  });