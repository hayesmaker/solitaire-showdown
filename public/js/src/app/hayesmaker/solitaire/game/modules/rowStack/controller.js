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
        console.log('[RowStackController] addCard :: index,cardName=', this.model.index, card.name, 'isPileCard=', card.isPiledCard);
        RowStackController.super.addCard.call(this, card);
        var i, c;
        var len = card.pileCards.length;

        for (i = 0; i < len; i++) {
          c = card.pileCards[i];
          this.model.addCard(c);
          this.model.dropPoint.y+=17;
        }

        this.model.dropPoint.y+=17;

      },

      removeCard: function(card) {
        console.warn('{RowStackController} :: removeCard :: index,cardName ',this.model.index, card.name, 'isPileCard=', card.isPiledCard);
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

      getResetDropPointY: function(card) {
        var numCards;
        console.warn('{RowStackController} getResetDropPointY :: cards.len', this.model.cards.length, ' pileCards.len=', card.pileCards.length);
        //I'm dragging a card + it's pile Cards, and need to return dropPoint to origin if called.

        //if (this.model.cards.length === card.pileCards.length + 1)
        //{
        //console.log('I am dragging a card + its pile Cards, and need to return dropPoint to origin if called.');
          //this.model.resetDropPointY();
        //} else {
        numCards = this.model.getNumCardsNotIncludingDraggingPile(card.pileCards.length + 1);
        console.warn('I am dragging a pile from a pile, numCardsExisting=', numCards);
        this.model.dropPoint.y = this.model.origin.y + numCards * 17;
        return this.model.dropPoint.y;

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

            if (card.originalStack == this) {
              console.warn('{RowStackController} origin stack available');
              this.setDropZoneEnabled(true);
              this.view.highlight(true);
            } else {
              this.setDropZoneEnabled(false);
              this.view.highlight(false);
            }
          }
        }
      }
    });

    return RowStackController;
  });