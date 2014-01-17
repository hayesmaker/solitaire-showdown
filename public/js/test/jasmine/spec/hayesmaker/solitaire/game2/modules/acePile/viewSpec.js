define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/acePile/view',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, AcePileView, Mocks) {

    var view, game;

    describe("AcePile.View tests", function() {

      beforeEach(function() {
        view = new AcePileView();
        game = Mocks.mockGame;
        view.init(game);
      });

      afterEach(function() {

        view = null;
        game = null;



      });

      it("board view is initialised correctly", function() {
        expect(view).toBeDefined();
      });

      describe("When drawRowStacks is called, 4 empty row stacks should be drawn to the screen", function() {

        var graphics, point;

        beforeEach(function() {
          spyOn(game.add, 'graphics').andReturn({
            beginFill: jasmine.createSpy('beginFill'),
            lineStyle: jasmine.createSpy('lineStyle'),
            drawRect: jasmine.createSpy('drawRect'),
            endFill: jasmine.createSpy('endFill')
          });

          var box = {x: 0, y: 0, width: 200, height:300};

          graphics = game.add.graphics(0,0);
          view.drawStack(box);
        });

        it("Expect graphics to have been called", function() {
          expect(game.add.graphics).toHaveBeenCalled();
        });

        it("Expect fill to be defined", function() {
          expect(graphics.beginFill).toHaveBeenCalled();
        });

        it("Expect borders to be defined", function() {
          expect(graphics.lineStyle).toHaveBeenCalled();
        });

        it("Expect fill to be cleared", function() {
          expect(graphics.endFill).toHaveBeenCalled();
        });

        it("Expect a rectangle to be drawn", function() {
          expect(graphics.drawRect.calls.length).toBe(1);
        });


      });



    });

  });