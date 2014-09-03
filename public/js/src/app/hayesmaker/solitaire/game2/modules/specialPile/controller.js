define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'modules/module',
    'modules/specialPile/view',
    'modules/specialPile/model'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Signal, Module, SpecialPileView, SpecialPileModel) {

    var SpecialPileController = Module.extend({

      /**
       *
       */
      constructor: function(origin) {
        this.model = new SpecialPileModel(this);

        var specialOrigin = {
          x: origin.x + 50,
          y: origin.y + 125
        };

        this.view = new SpecialPileView(this, specialOrigin);
        this.model.setBox(specialOrigin.x, specialOrigin.y, 70, 90);
      },

      /**
       *
       * @param game
       */
      init: function(game) {
        SpecialPileController.super.init.call(this, game);
        this.view.init(game);

      },

      startGame: function() {
        console.log('SpecialPileController :: startGame');
        this.view.drawStack(this.model.box);
      },

      addCard: function(card) {
        card.cardLanded.add(this.specialCardPlaced, this);
        this.model.addCard(card);
        this.view.dealCard(card);

      },

      specialCardPlaced: function(card) {
        console.log('{SpecialPileController} :: specialCardPlaced', card.name, card.dropSuccessful);
        if (!card.dropSuccessful)
        {
          return;
        } else {
          var card = this.model.removeCard();
          //card.isSpecial = false;

          console.log('{SpecialPileController} :: specialCardPlaced :: card=', card);

          this.view.removeCard();
        }




        /*
        if (!card.dropSuccessful)
        {
          return;
        }
        else {
          if (card.isSpecial) {
            card.isSpecial = false;
            this.view.removeCard();
          }
        }
        */
      },

      getTopSpecialCard: function() {

        var topCard = this.model.getTopCard();
        console.log('[SpecialPileController] :: getTopSpecialCard', topCard.name);
        return topCard;
      }



    });

    return SpecialPileController;
  });
