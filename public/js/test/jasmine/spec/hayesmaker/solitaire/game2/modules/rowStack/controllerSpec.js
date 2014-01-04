define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/rowStack/controller',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, RowStackController, Mocks) {

    describe("RowStack.Controller Tests", function() {

      var controller;
      var game;

      beforeEach(function() {
        controller = new RowStackController();
        game = Mocks.mockGame;
        controller.init(game, {x: 0, y: 0, width: 200, height: 200  });
      });

      afterEach(function() {
        controller = null;
        game = null;
      });

      describe("RowStack.Controller gets initted correctly", function() {
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

        it("When a card is added, model drop point is updated", function() {

          controller.model.dropPoint = {x: 400, y: 300};

          controller.addCard();

          expect(controller.model.dropPoint.y).toBe(317);

        });

      });




    });


  });