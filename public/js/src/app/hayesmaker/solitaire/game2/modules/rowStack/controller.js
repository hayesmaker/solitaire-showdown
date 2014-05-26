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

      addCard: function(card) {
        RowStackController.super.addCard.call(this, card);
        this.model.addCardHeightToDropPoint();

      },

      removeCard: function() {
        this.model.removeCardHeightFromDropPoint();
      },

      checkAvailable: function(card) {

        RowStackController.super.checkAvailable.call(this, card);

        if (!this.model.cards.length) {
          this.setDropZoneEnabled(true);
        } else {
          var lastCard = this.model.getLastCard();
          console.log('lastCardName', lastCard.name);
          if (card.value === lastCard.value - 1) {
            if (card.isRed && lastCard.isBlack) {
              this.setDropZoneEnabled(true);
            }
          }
        }

        console.log('checkAvailable', this.model.cards, this.model.dropZoneEnabled);
      }

    });

    return RowStackController;
  });