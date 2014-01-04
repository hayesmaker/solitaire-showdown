define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var BoardModel = Class.extend({

      constructor: function() {
        /**
         * @deprecated
         * @type {{points: Array, width: number, height: number}}
         */
        this.rowStacksModel = {
          points: [],
          width: 0,
          height: 0
        };

        this.rowStacks = [];
        this.acePiles = [];


      },

      /**
       * @deprecated
       * @param point
       * @param width
       * @param height
       */
      initRowStacks: function(point, width, height) {
        var point1 = point;
        var point2 = {x: point1.x + 100, y: point.y};
        var point3 = {x: point2.x + 100, y: point.y};
        var point4 = {x: point3.x + 100, y: point.y};
        this.rowStacksModel.points = [point1, point2, point3, point4];
        this.rowStacksModel.width = width;
        this.rowStacksModel.height = height;
      }



    });

    return BoardModel;
  });