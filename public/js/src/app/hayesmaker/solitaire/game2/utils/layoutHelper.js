define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs'
  ],
  function(_, Class, Phaser, TweenMax, PIXI) {

    var LayoutHelper = Class.extend({

      constructor: function() {
        this.dropPoints = [];
      },

      setDropPoints: function(dropPoints) {
        //console.log('LayoutHelper :: setDropPoints', dropPoints);
        this.dropPoints = _.clone(dropPoints);
      },

      /**
       *
       * @param point
       */
      getNearestDropPoint: function(point) {
        //console.log('getNearestDropPoint :: this.dropPoints', this.dropPoints);
        var distances = [];
        for (var i = 0; i < this.dropPoints.length; i++) {
          var dropPoint = this.dropPoints[i];
          var distance = this.distanceBetween(point, {x:dropPoint.x, y:dropPoint.y});
          distances.push({point: dropPoint, distance: distance, index : i});
        }
        var closestPoint =_.min(distances, 'distance');
        return closestPoint;
      },

      /**
       * Utils
       * @test: layoutSpec
       * @param a
       * @param b
       * @returns {number}
       */
      distanceBetween: function(a, b) {
        var d = {
          x: Math.abs(a.x - b.x),
          y: Math.abs(a.y - b.y)
        };
        return Math.sqrt(d.x * d.x + d.y * d.y);
      }


    });

    return LayoutHelper;
  });