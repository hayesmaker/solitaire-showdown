define(['signals', 'class', 'components/state'], function(Signal, Class) {
  'use strict';

  var Controller = Class.extend({

    constructor: function() {



    },

    initialise: function() {
      this.initialCardsDealt = new Signal();
      this.specialCardsDealt = new Signal();
      this.drawn3cards = new Signal();

    }

  });

  return Controller;

});