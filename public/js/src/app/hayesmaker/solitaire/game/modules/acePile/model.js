define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/droppableStack/model'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, DroppableStackModel) {

    var AcePileModel = DroppableStackModel.extend({

      constructor: function(controller) {
        AcePileModel.super.constructor.call(this, controller);
      }


    });

    return AcePileModel;
  });