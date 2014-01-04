define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var AcePileModel = Class.extend({

      constructor: function() {
        this.box = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };

        this.dropZoneEnabled = false;
        this.dropPoint = {
          x: 0,
          y: 0
        };
      },

      setDropZoneEnabled: function(bool) {
        this.dropZoneEnabled = bool;
      },

      setBox: function(x, y, width, height) {
        this.box.x = x;
        this.box.y = y;
        this.box.width = width;
        this.box.height = height;
        this.dropPoint.x = x;
        this.dropPoint.y = y;
      }

    });

    return AcePileModel;
  });