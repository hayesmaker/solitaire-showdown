define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/module',
    'modules/board/controller',
    'testHelpers/mocks',
    'components/card'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, Module, BoardController, Mocks, Card) {


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

          describe("onCardLanded tests", function() {

            var card;

            beforeEach(function() {
              card = Mocks.getCard('ah');
            });

            it("given that card drop was successful, card vars are reset", function() {
              card.dropSuccessful = true;
              controller.onCardLanded(card);
              expect(card.resetCardVars).toHaveBeenCalled();
            });

            it("given that card drop was successful, dragging is disabled", function() {
              card.dropSuccessful = true;
              controller.onCardLanded(card);
              expect(card.disableDrag).toHaveBeenCalled();
            });

            it("given that card drop was successful, card is added to stack", function() {
              card.dropSuccessful = true;
              controller.onCardLanded(card);
              expect(card.addToStack).toHaveBeenCalled();
            });

            /*
            it("given that card drop was successful, next card dragging is enabled", function() {
              card.dropSuccessful = true;
              controller.onCardLanded(card);
              expect(card.enableNextCard).toHaveBeenCalled();
            });
            */

            it("given that card drop was not successful, card vars are not reset", function() {
              card.dropSuccessful = false;
              controller.onCardLanded(card);
              expect(card.resetCardVars).not.toHaveBeenCalled();
            });

            it("given that card drop was not successful, dragging is not disabled", function() {
              card.dropSuccessful = false;
              controller.onCardLanded(card);
              expect(card.disableDrag).not.toHaveBeenCalled();
            });

            it("given that card drop was not successful, card is added not to stack", function() {
              card.dropSuccessful = false;
              controller.onCardLanded(card);
              expect(card.addToStack).not.toHaveBeenCalled();
            });

            /*
            it("given that card drop was not successful, next card dragging is not enabled", function() {
              card.dropSuccessful = false;
              controller.onCardLanded(card);
              expect(card.enableNextCard).not.toHaveBeenCalled();
            });
            */
          });

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

          it("Given that all acePiles are enabled, whenI call getAllAcePileDropPoints, I get an array of drop points", function() {
            controller.enableAllAcePiles();
            var dropPoints = controller.getAllAcePileDropPoints();
            expect(dropPoints[0]).toEqual({x: 300, y: 380});
            expect(dropPoints[1]).toEqual({x: 390, y: 380});
            expect(dropPoints[2]).toEqual({x: 480, y: 380});
            expect(dropPoints[3]).toEqual({x: 570, y: 380});
            expect(dropPoints[4]).toEqual({x: 660, y: 380});
            expect(dropPoints[5]).toEqual({x: 750, y: 380});
            expect(dropPoints[6]).toEqual({x: 840, y: 380});
            expect(dropPoints[7]).toEqual({x: 930, y: 380});

          });
        });

        /**
         * onDetectAvailableSlots: function(card) {
            var dropPoints = [];
            var dropStacks = [];
            var i, stackModel, stack;
            if (card.isPlayer1) {
              for (i = 0; i < 4; i ++) {
                stackModel = this.model.rowStacks[i].model;
                stack = this.model.rowStacks[i];
                stack.checkAvailable(card);
                if (stackModel.dropZoneEnabled) {
                  dropStacks.push(stack);
                  dropPoints.push(stackModel.dropPoint);
                }
              }
            }
            if (card.isPlayer2) {
              for (i = 4; i < 8; i ++) {
                stackModel = this.model.rowStacks[i].model;
                stack = this.model.rowStacks[i];
                stack.checkAvailable(card);
                if (stackModel.dropZoneEnabled) {
                  dropStacks.push(stack);
                  dropPoints.push(stackModel.dropPoint);
                }
              }
            }
            if (dropStacks.length) {
              card.dropSuccessful = true;
            }
            card.setDropPoints(dropPoints);
            card.setDropStacks(dropStacks);
          }
         */

        describe("onDetectAvailableSlots Tests", function() {
          beforeEach(function() {

          });

          it("Given I am player 1 and all rowStacks are empty, then all player 1's rowStacks should be enabled", function() {

            var card = new Card('2h', true);
            card.isPlayer1 = true;

            var spy = spyOn(card, 'setDropStacks');

            controller.onDetectAvailableSlots(card);

            expect(spy).toHaveBeenCalled();
            expect(spy.mostRecentCall.args[0].length).toBe(4);
            _.each(spy.mostRecentCall.args[0], function(rowStackController) {
              expect(rowStackController.model.dropZoneEnabled).toBe(true);
            });

          });

          it("Given I am player 2 and all rowStacks are empty, then all player 2's rowStacks should be enabled", function() {

            var card = new Card('2h', true);
            card.isPlayer2 = true;

            var spy = spyOn(card, 'setDropStacks');

            controller.onDetectAvailableSlots(card);

            expect(spy).toHaveBeenCalled();
            expect(spy.mostRecentCall.args[0].length).toBe(4);
            _.each(spy.mostRecentCall.args[0], function(rowStackController) {
              expect(rowStackController.model.dropZoneEnabled).toBe(true);
            });

          });
        });
      });





    });


  });