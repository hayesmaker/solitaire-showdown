define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var SpecialPileModel = Class.extend({

      constructor: function(controller) {
        this.controller = controller;

        this.box = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };

        this.cards = [];
      },

      setBox: function(x, y, width, height) {
        this.box.x = x;
        this.box.y = y;
        this.box.width = width;
        this.box.height = height;
      },

      addCard: function(card) {
        this.cards.push(card);
      },

      getTopCard: function() {
        var topCard = this.cards[this.cards.length-1];
        console.log('this.getTopCard=', topCard.name);
        return topCard;
      },

      removeCard: function() {
        return this.cards.pop();
      },

      getCardByCardName: function(cardName)
      {
        var card = _.find(this.cards, function(card) {
          return card.name === cardName;
        });
        console.log('{SpecialPileModel} :: getCardByCardName :: card found=', card);
        return card;
      }



    });

    return SpecialPileModel;
  });