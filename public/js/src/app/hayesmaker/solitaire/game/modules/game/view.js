define(
  [
    'lodash',
    'class',
    'signals',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/view'
  ],
  function(_, Class, Signal, Phaser, TweenMax, PIXI, View) {

    var GameView = View.extend({

      constructor: function(controller) {
        View.super.constructor.call(this, controller);
        this.countDown = 3;
        this.countDownTextField = null;
        this.countDownTimer = null;
        this.countDownComplete = new Signal();
      },

      drawCountDown: function() {
        var text = this.countDown;
        var style =
        {
          font: "72px Arial",
          fill: "#ff0044",
          align: "center"
        };
        this.countDownTextField = this.game.add.text(100,400, text, style);
      },

      startCountDown: function() {
        var self = this;
        this.countDownTimer = setInterval(function() {
          if (self.countDown > 0)
          {
            self.countDown--;
            self.countDownTextField.setText(self.countDown);
            if (self.countDown === 0)
            {
              self.countDownTextField.setText('Go!');
              self.clearCountDown();
              console.log('COUNTDOWN COMPLETED');
              self.countDownComplete.dispatch();
            }
          }
        }, 1000);

      },

      clearCountDown:  function() {
        clearInterval(this.countDownTimer);
      }



    });

    return GameView;
  });