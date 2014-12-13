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
        this.model = new RowStackModel(this);
        this.view = new RowStackView(this);
      },

      addCard: function(card) {
        console.log('[RowStackController] addCard :: card.name=', card.name);
        RowStackController.super.addCard.call(this, card);
        var i, c;
        var len = card.pileCards.length;
        for (i = 0; i < len; i++) {
          c = card.pileCards[i];
          this.model.addCard(c);
        }
        this.model.addCardHeightToDropPoint();

        //this.view.addCard(card);
      },

      removeCard: function(card) {
        console.warn('{RowStackController} :: removeCard :: ', card.name, this.model.index, 'isPileCard=', card.isPiledCard);
        RowStackController.super.removeCard.call(this, card);
        var i, len, c;
        if (card.isPiledCard) {
          console.log('{RowStackController} :: piledCardRemoved is:', card.name, card.droppedStack.model.index, card.originalStack.model.index);
          //get current cards in this stack and remove piledCards from this card down.
          len = this.model.cards.length;
          console.log('{RowStackController} :: removePiledCards from model.cards.len=', len);
          for (i = 0; i < len; i++) {
            c = this.model.cards[i];
            console.log('the cards here are:', i, c.name, c.pileCards.length);
            c.removeAllPiledCardsFromThisCardDown(card);
          }
        }
        this.model.dropPoint.y = this.model.getCorrectYPosition();
      },

      checkAvailable: function(card) {
        RowStackController.super.checkAvailable.call(this, card.name);
        //console.log('[RowStackController] checkAvailable :: model.cards=', this.model.cards, 'model.dropZoneEnabled=', this.model.dropZoneEnabled);
        if (!this.model.cards.length) {
          this.setDropZoneEnabled(true);
          this.view.highlight(true);
        } else {
          var lastCard = this.model.getLastCard();
          console.log('[RowStackController] checkAvailable :: model.cards is not empty... checking rules to decide if available');
          if (card.value === lastCard.value - 1 && ((card.isRed && lastCard.isBlack) || (card.isBlack && lastCard.isRed))) {
              this.setDropZoneEnabled(true);
              this.view.highlight(true);
          } else {
            this.setDropZoneEnabled(false);
            this.view.highlight(false);
          }
        }
      }
    });

    return RowStackController;
  });