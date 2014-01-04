define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/board/controller',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, BoardController, Mocks) {


      //todo next

    describe("Board.Controller Tests", function() {

      var controller;
      var game;
      var RowStackModuleSpy;

      beforeEach(function() {
        controller = new BoardController();
        game = Mocks.mockGame;

        controller.init(game);
      });

      afterEach(function() {
        controller = null;
        game = null;
      });

      describe("Board.Controller gets initialised correctly", function() {
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

        it("4 rowStacks get created on init", function() {
          expect(controller.model.rowStacks.length).toBe(8);
        });
      });

      describe("Method Tests", function() {

        describe("enableAllRowStacks", function() {
          it("when I call enableAllRowStacks, then all rowStacks dropZones should become enabled", function() {
            controller.enableAllRowStacks();
            expect(controller.model.rowStacks[0].model.dropZoneEnabled).toBe(true);
            expect(controller.model.rowStacks[1].model.dropZoneEnabled).toBe(true);
            expect(controller.model.rowStacks[2].model.dropZoneEnabled).toBe(true);
            expect(controller.model.rowStacks[3].model.dropZoneEnabled).toBe(true);
          });
        });

        describe("getAllRowStackDropPoints Method", function() {
          it("Given that rowStack 1 is enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.model.rowStacks[0].model.dropZoneEnabled = true;
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[0]).toEqual({x: 470, y: 50});
          });

          it("Given that rowStack 2 is enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.model.rowStacks[1].model.dropZoneEnabled = true;
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[1]).toEqual({x: 570, y: 50});
          });

          it("Given that rowStacks 3 and 4 are enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.model.rowStacks[2].model.dropZoneEnabled = true;
            controller.model.rowStacks[3].model.dropZoneEnabled = true;
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[2]).toEqual({x: 670, y: 50});
            expect(dropPoints[3]).toEqual({x: 770, y: 50});
          });

          it("Given that all rowStacks are enabled, when I call getAllRowStackDropPoints, I get correct array of drop points", function() {
            controller.enableAllRowStacks();
            var dropPoints = controller.getAllRowStackDropPoints();
            expect(dropPoints[0]).toEqual({x: 470, y: 50});
            expect(dropPoints[1]).toEqual({x: 570, y: 50});
            expect(dropPoints[2]).toEqual({x: 670, y: 50});
            expect(dropPoints[3]).toEqual({x: 770, y: 50});
          });
        });
      });





    });


  });