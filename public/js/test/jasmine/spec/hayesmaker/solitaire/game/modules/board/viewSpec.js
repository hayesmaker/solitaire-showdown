define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/board/view',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, View, Mocks) {

    var view, game;

    describe("Board.View tests", function() {

      beforeEach(function() {
        view = new View();
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


    });


  });