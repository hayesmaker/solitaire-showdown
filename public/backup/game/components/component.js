define(['class'], function(Class) {
  'use strict';

  var Component = Class.extend({

    constructor: function(controller) {
      //test type of controller
      if (controller) {
        this.controller = controller;
      }
    }

  });
  return Component;
});
