define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'modules/module',
    'modules/player/model',
    'modules/player/view',
    'modules/specialPile/controller'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signal, Module, Model, View, SpecialPileController) {

    var PlayerController = Module.extend({

      constructor: function(origin) {
        this.model = new Model(this);
        this.view = new View(this, origin);
        this.origin = origin;
        this.specialPile = new SpecialPileController(origin);
        this.boardController = null;
        this.player = 0;
        this.isPlayer = null;
      },

      init: function(game, boardController, player) {
        PlayerController.super.init.call(this, game);
        this.player = this.model.player = player;
        this.view.init(game);
        this.specialPile.init(game);
        this.boardController = boardController;
      },

      drawStacks: function() {
        this.specialPile.drawStack();
      },

      setId: function(id)
      {
        console.log('{PlayerController} setId :: player,id=', this.player, id);
        this.model.id = id;
      },

      startGame: function(isPlayer) {
        this.isPlayer = isPlayer;
        this.specialPile.startGame();
      },

      /**
       * @param card
       */
      dealCard: function(card) {
        this.model.addToDrawPile(card);
        this.view.dealCard(card);
        if (this.isPlayer) {
          this.view.enableDrawPileClick(card);
        }
      },

      /**
       * @param card
       */
      dealSpecialCard: function(card, isLastCard) {
        console.log('{PlayerController} :: dealSpecialCard :: cardName, isMe, isLastCard=', card.name, this.isPlayer, isLastCard);
        this.specialPile.addCard(card);
        if (this.isPlayer && isLastCard)
        {
          var nextSpecialCards = [];
          var len = this.specialPile.model.cards.length;

          console.log('{PlayerController} :: dealSpecialCard :: setNextCards=', this.specialPile.model.cards);
          for (var i = 0; i < len - 1; i++)
          {
            nextSpecialCards.push(this.specialPile.model.cards[i]);
          }
          card.setNextCards(nextSpecialCards);
          card.enableDrag();
        }
      },

      draw3Cards: function()
      {
        console.log('{PlayerController} :: draw3Cards');
        this.view.draw3Cards(this.model.get3FromPile(), this.isPlayer);
      },

      onDrawerPileClicked: function(card) {
        console.log('{PlayerController} :: onDrawerPileClicked');
        //this.draw3Cards();
        this.boardController.onDrawPileClicked({
          player: this.player
        });
      },

      /**
       * @param data
       * {cardName: "7d", player: 1, dropStackIndexFrom: -1, dropStackFromType: 'special': dropStackIndexTo: 1, type: "rowStack"}
       */
      moveCard: function(data, boardCard) {
        console.log('{PlayerController} :: moveCard :: data=', data);
        var card;
        if (data.dropStackFromType === 'special') {
          card = this.specialPile.model.getCardByCardName(data.cardName);
        } else if (data.dropStackFromType === 'draw') {
          card = this.model.getCardByCardName(data.cardName);
        } else if (data.dropStackFromType === 'rowStack') {
          card = boardCard;
        }

        var targetStack = this.boardController.getStackByIndex(data.dropStackIndexTo, data.type, data.player);
        console.log('{PlayerController} :: moveCard :: targetStack=', targetStack);
        var dropPosition = targetStack.model.dropPoint;

        if (data.includePile) {
          card.attachPiledCards();
        }

        TweenMax.to(card.sprite, 0.5, {x: dropPosition.x, y: dropPosition.y});
        targetStack.addCard(card);
      },

      /**
       * @deprecated
       */
      /*
      onRefreshAvailableDropStacks: function() {
        /*
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
        var topSpecialCard = this.specialPile.getTopSpecialCard();
        var topVisibleDrawCard = this.model.getNextVisibleDrawCard();
        console.log('{PlayerController} onRefreshAvailableDrawStacks :: topSpecial=', topSpecialCard && topSpecialCard.name, 'topVisible=', topVisibleDrawCard && topVisibleDrawCard.name);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>');

        if (topSpecialCard)
        {
          this.reCheckAvailableStacks(topSpecialCard);
        }

        if (topVisibleDrawCard)
        {
          this.reCheckAvailableStacks(topVisibleDrawCard);
        }


        this.boardController.model.checkAllDrawPilesForMoves(this.player);



      },
      */

      reCheckAvailableStacks: function(card) {
        this.boardController.model.checkAvailableStacks(card);
      }





    });

    return PlayerController;
  });