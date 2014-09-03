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
      },

      checkAvailable: function(card) {
        AcePileController.super.checkAvailable.call(this, card.name);
        if (!this.model.cards.length && card.isAce) {
          this.setDropZoneEnabled(true);
        } else {
          var topCardOnPile = this.model.getLastCard();

          if (topCardOnPile && topCardOnPile.cardIsSameSuitAndOneHigher(card))
          {
            this.setDropZoneEnabled(true);
          } else {
            this.setDropZoneEnabled(false);
          }
        }
      }




    });

    return AcePileController;
  });