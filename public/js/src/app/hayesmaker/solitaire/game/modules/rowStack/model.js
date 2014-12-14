define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/droppableStack/model'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, DroppableStackModel) {

    var RowStackModel = DroppableStackModel.extend({

      constructor: function(controller) {
        RowStackModel.super.constructor.call(this, controller);
      },

      resetDropPointY: function() {

        this.dropPoint.y = this.origin.y;

      },

      getNumCardsNotIncludingDraggingPile: function(pileLen) {
        return this.cards.length - pileLen;
      },

      addCardHeightToDropPoint: function() {
        this.dropPoint.y += 17;
      },

      getCorrectYPosition: function() {
        var y = this.origin.y;
        y += this.cards.length * 17;

        console.log('{RowStackModel} getCorrectYPosition :: origin, y, cards.len', this.origin.y, y, this.cards.length);

        return y;
      }



    });

    return RowStackModel;
  });