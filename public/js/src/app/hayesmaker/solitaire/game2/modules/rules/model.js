define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var RulesModel = Class.extend({

      constructor: function(controller) {
        this.controller = controller;
        this.deck = [];
        this.specialDeck = [];
      }



    });

    return RulesModel;
  });