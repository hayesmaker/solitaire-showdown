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
      }



    });

    return SpecialPileModel;
  });