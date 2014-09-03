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

      constructor: function() {
        this.drawPile = [];
        this.visible = [];
        this.unused = [];
      },

      get3FromPile: function() {
        var i, len;
        len = this.unused.length;
        for (i=0; i < len; i++)
        {
          this.unused[i].disableDrag();
        }
        this.unused = [];
        len = this.drawPile.length >= 3 ? 3 : this.drawPile.length;
        for (i = 0; i < len; i ++) {
          var nextCard = this.drawPile.pop();
          this.unused.push(nextCard);
          this.visible.push(nextCard);
        }
        return this.unused;
      },

      addToDrawPile: function(card) {
        this.drawPile.push(card);
        card.cardLanded.add(this.removeFromVisibleDrawPile, this);
      },

      removeFromVisibleDrawPile: function(card) {
        console.log('{PlayerModel} :: removeFromVisibleDrawPile :: ', card);
        this.visible.pop();
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