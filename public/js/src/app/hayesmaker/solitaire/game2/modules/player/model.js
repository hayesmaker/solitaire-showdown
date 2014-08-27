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
      },

      get3FromPile: function() {
        var next3 = [];
        var len = this.drawPile.length >= 3 ? 3 : this.drawPile.length;
        for (var i = 0; i < len; i ++) {
          var nextCard = this.drawPile.pop();
          next3.push(nextCard);
          this.visible.push(nextCard);
        }
        return next3;
      },

      addToDrawPile: function(card) {
        this.drawPile.push(card);
        card.cardLanded.add(this.removeFromVisibleDrawPile, this);
      },

      removeFromVisibleDrawPile: function(card) {
        console.log('[PlayerModel] :: removeFromVisibleDrawPile :: ', card);
        this.visible.pop();
      },

      getNextVisibleDrawCard: function() {
        if (this.visible.length) {
          var nextVisibleCard = this.visible[this.visible.length-1];
          console.log('[PlayerModel] :: getNextVisibleDrawCard=', nextVisibleCard.name);
          return nextVisibleCard;
        } else {
          return null;
        }
      }
    });


    return PlayerModel;
  });