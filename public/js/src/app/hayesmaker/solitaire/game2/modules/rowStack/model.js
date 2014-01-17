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

    var RowStackModel = DroppableStackModel.extend({

      constructor: function(controller) {
        RowStackModel.super.constructor.call(this, controller);
      },

      addCardHeightToDropPoint: function() {
        this.dropPoint.y += 17;
      },

      removeCardHeightFromDropPoint: function() {
        this.dropPoint.y -= 17;
      }


    });

    return RowStackModel;
  });