define(['lodash', 'components/component', 'components/player'], function(_, Component, Player) {
  'use strict';

  var State = Component.extend({
    constructor: function(controller) {
      State.super.constructor.call(this, controller);

    },

    initialise: function() {
      /*
      this.player1 = new Player(this.controller);
      this.player1.initialise(1);
      this.player2 = new Player(this.controller);
      this.player2.initialise(2);
      */
      //this.controller.initialCardsDealt.dispatch(this.deck, this.specialDeck, cardsPayload);
      //this.this.controller.initialCardsDealt.add(this.onInitialCardsDealt, this);


    }

    /*
    onInitialCardsDealt: function(normalCards, specialCards, cardsPayload) {



    }
  */



  });

  return State;
});