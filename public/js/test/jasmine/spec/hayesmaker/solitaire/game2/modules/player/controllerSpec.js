define(
  [
    'jasmineSignals',
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'signals',
    'modules/module',
    'modules/player/controller',
    'testHelpers/mocks'
  ],
  function(spyOnSignal, _, Class, Phaser, TweenMax, PIXI, Signal, Module, PlayerController, Mocks) {

    describe('Player.Controller Tests', function() {

      var controller, game,
        mockCard = Mocks.mockCard;

      beforeEach(function() {
        game = jasmine.createSpyObj('game', ['boot']);
        controller = new PlayerController({x: 0, y: 0, width: 90, height: 200});
      });

      it("Make sure controller is initialised correctly", function() {
        controller.init(game);
        expect(controller).toBeDefined();
      });

      it("Make sure origin is passed to Player Controller", function() {
        expect(controller.origin).toEqual({x: 0, y:0, width: 90, height: 200});
      });

      it("Make sure controller.game is initialised correctly", function() {
        controller.init(game);
        expect(controller.game).toBeDefined();
      });

      it("Make sure game is passed to the view", function() {
        controller.init(game);
        expect(controller.view.game).toBeDefined();
      });



      it("When onDrawerPileClicked is called, view is instructed to draw 3 cards with the top 3 cards in drawer pile", function() {

        var spy = spyOn(controller.view, 'draw3Cards');
        controller.model.addToDrawPile(mockCard);
        controller.model.addToDrawPile(mockCard);
        controller.model.addToDrawPile(mockCard);
        controller.onDrawerPileClicked(mockCard);
        expect(spy).toHaveBeenCalled();
      });

      it("If less than 3 cards are available in draw pile, then draw only those remaining cards.", function() {
        controller.model.addToDrawPile(mockCard);
        controller.model.addToDrawPile(mockCard);

        expect(controller.model.get3FromPile().length).toBe(2);
      });

      it("When a card is dealt to this player, make sure model gets updated with it", function() {
        controller.dealCard(mockCard);
        expect(controller.model.drawPile).toEqual([mockCard]);
      });

      it("When a card is dealt to this player, make sure view gets updated with it", function() {
        var spy = spyOn(controller.view, 'dealCard');
        controller.dealCard(mockCard);
        expect(spy).toHaveBeenCalledWith(mockCard);
      });

      describe("4.   Game ends when 1 player has removed all 13 cards from their special pile", function() {

        it("", function() {

        });

      });



    });


  });