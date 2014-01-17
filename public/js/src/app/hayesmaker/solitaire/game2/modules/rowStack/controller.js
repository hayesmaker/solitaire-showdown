define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/rowStack/model',
    'modules/rowStack/view',
    'modules/droppableStack/controller'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, RowStackModel, RowStackView, DroppableStackController) {

    var RowStackController = DroppableStackController.extend({

      constructor: function() {
        //RowStackController.super.constructor.call(this);
        this.model = new RowStackModel(this);
        this.view = new RowStackView(this);
      },

      addCard: function() {
        this.model.addCardHeightToDropPoint();
      },

      removeCard: function() {
        this.model.removeCardHeightFromDropPoint();
      }

    });

    return RowStackController;
  });