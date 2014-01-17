define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/acePile/model',
    'modules/acePile/view',
    'modules/droppableStack/controller',
    'modules/droppableStack/model',
    'modules/droppableStack/view',
  ],
  function(_, Class, Phaser, TweenMax, PIXI, AcePileModel, AcePileView, DroppableStackController, DroppableStackModel, DroppableStackView) {

    var AcePileController = DroppableStackController.extend({

      constructor: function() {
        this.model = new AcePileModel(this);
        this.view = new AcePileView(this);
      }




    });

    return AcePileController;
  });