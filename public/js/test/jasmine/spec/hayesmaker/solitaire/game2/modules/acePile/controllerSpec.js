define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/acePile/model',
    'modules/acePile/view',
    'modules/acePile/controller',
    'testHelpers/mocks',
    'components/card'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, AcePileModel, AcePileView, AcePileController, Mocks, Card) {

    describe("AcePile.Controller Tests", function() {

      var controller;
      var game;

      beforeEach(function() {
        controller = new AcePileController();
        game = Mocks.mockGame;
        controller.init(game, {x: 0, y: 0, width: 200, height: 200  });
      });

      afterEach(function() {
        controller = null;
        game = null;
      });

      describe("AcePile.Controller gets initted correctly", function() {
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

        it("When I setDropZoneEnabled, model is updated", function() {
          controller.setDropZoneEnabled(true);
          expect(controller.model.dropZoneEnabled).toBe(true);
        });

        it("When I disable dropZoneEnabled, model is updated", function() {
          controller.setDropZoneEnabled(false);
          expect(controller.model.dropZoneEnabled).toBe(false);
        });

        describe("CheckAvailable Tests", function() {
          beforeEach(function() {

          });

          it("This AcePile is empty, and I have an Ace, then this pile should be available", function() {
            var card = new Card('ah', true);
            controller.checkAvailable(card);
            expect(controller.model.cards.length).toBe(0);
            expect(controller.model.dropZoneEnabled).toBe(true);
          });



        });

      });




    });

  });