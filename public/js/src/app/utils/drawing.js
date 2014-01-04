define(['pixi'], function(PIXI) {

  return function() {
    return {
      initialise: function() {
        console.log('fucker js');
        PIXI.Texture.Draw = function (cb) {
          var canvas = document.createElement('canvas');
          if (typeof cb == 'function') cb(canvas);
          return PIXI.Texture.fromCanvas(canvas);
        };
      }
    };
  };

});