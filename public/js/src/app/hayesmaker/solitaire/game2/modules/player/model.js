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
      },

      get3FromPile: function() {
        var next3 = [];
        var len = this.drawPile.length >= 3 ? 3 : this.drawPile.length;
        for (var i = 0; i < len; i ++) {
          next3.push(this.drawPile.pop());
        }
        return next3;
      },

      addToDrawPile: function(card) {

        this.drawPile.push(card);
      }


    });


    return PlayerModel;
  });