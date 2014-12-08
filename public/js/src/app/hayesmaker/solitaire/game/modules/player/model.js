define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var PlayerModel = Class.extend({

      constructor: function(controller) {
        this.controller = controller;
        this.drawPile = [];
        this.visible = [];
        this.unused = [];
        this.id = 0;
        this.player = 0;
        this.isMe = null;
      },

      get3FromPile: function() {
        var i, len;
        len = this.unused.length;
        for (i=0; i < len; i++)
        {
          if (!this.unused[i].isUsed)
          {
            this.unused[i].disableDrag();
          }
        }
        this.unused = [];
        len = this.drawPile.length >= 3 ? 3 : this.drawPile.length;
        for (i = 0; i < len; i ++) {
          var nextCard = this.drawPile.pop();
          this.unused.push(nextCard);
          this.visible.push(nextCard);
        }
        console.log('{PlayerModel} :: get3FromPile :: drawPile.len, cards=', this.drawPile.length, this.unused);
        return this.unused;
      },

      getCardByCardName: function(cardName) {
        var card = _.find(this.visible, function(card) {
          return card.name === cardName;
        });
        console.log('{PlayerModel} :: getCardByCardName :: card found=', card);
        return card;
      },

      addToDrawPile: function(card) {
        this.drawPile.push(card);
        card.cardLanded.add(this.removeFromVisibleDrawPile, this);
      },

      removeFromVisibleDrawPile: function(card) {
        this.visible.pop();
        this.unused.pop();
        if (!this.unused.length && this.controller.isPlayer) {
          var nextVisibleCard = this.getNextVisibleDrawCard();
          if (nextVisibleCard) {
            nextVisibleCard.softEnableDrag();
          }
        }
        card.cardLanded.remove(this.removeFromVisibleDrawPile,this);
      },

      getNextVisibleDrawCard: function() {
        if (this.visible.length) {
          var nextVisibleCard = this.visible[this.visible.length-1];
          console.log('{PlayerModel} :: getNextVisibleDrawCard=', nextVisibleCard.name);
          return nextVisibleCard;
        } else {
          return null;
        }
      }
    });


    return PlayerModel;
  });