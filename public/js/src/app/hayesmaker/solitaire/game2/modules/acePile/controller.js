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

        AcePileController.super.checkAvailable.call(this, card);

        if (!this.model.cards.length) {

          if (card.isAce) {
            this.setDropZoneEnabled(true);
          }

        } else {
          var lastCard = this.model.getLastCard();
          console.log(this, 'checkAvailable :: lastCard', lastCard.name);
        }

        //console.log('checkAvailable', this.model.cards, this.model.dropZoneEnabled);
      }





    });

    return AcePileController;
  });