define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/specialPile/controller',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, SpecialPileController, Mocks) {

    describe("SpecialPile.Controller Tests", function() {

      var controller;
      var game;

      beforeEach(function() {
        controller = new SpecialPileController({x: 0, y: 0, width: 200, height: 200  });
        game = Mocks.mockGame;
        controller.init(game);
      });

      afterEach(function() {
        controller = null;
        game = null;
      });

      describe("SpecialPile.Controller gets initted correctly", function() {
        it("Controller is defined", function() {
          expect(controller).toBeDefined();
        });

        it("model is defined", function() {
          expect(controller.model).toBeDefined();
        });

        it("view is defined", function() {
          expect(controller.view).toBeDefined();
        });

        it("Phaser.Game object is defined", function() {
          expect(controller.game).toBeDefined();
          expect(controller.game).toEqual(game);
        });

      });

      describe("Method Tests", function() {

      });




    });


  });