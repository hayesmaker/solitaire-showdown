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
        console.log('[RowStackController] addCard :: card.name=', card.name);
        RowStackController.super.addCard.call(this, card);
        this.model.addCardHeightToDropPoint();
      },

      removeCard: function(card) {
        console.log('{RowStackController} :: removeCard :: ', card.name);
        RowStackController.super.removeCard.call(this, card);
        this.model.removeCardHeightFromDropPoint();
      },

      checkAvailable: function(card) {
        RowStackController.super.checkAvailable.call(this, card.name);
        //console.log('[RowStackController] checkAvailable :: model.cards=', this.model.cards, 'model.dropZoneEnabled=', this.model.dropZoneEnabled);
        if (!this.model.cards.length) {
          this.setDropZoneEnabled(true);
        } else {
          var lastCard = this.model.getLastCard();
          //console.log('[RowStackController] checkAvailable :: model.cards is not empty... checking rules to decide if available');
          if (card.value === lastCard.value - 1 && ((card.isRed && lastCard.isBlack) || (card.isBlack && lastCard.isRed))) {
              this.setDropZoneEnabled(true);
          } else {
            this.setDropZoneEnabled(false);
          }
        }
      }
    });

    return RowStackController;
  });