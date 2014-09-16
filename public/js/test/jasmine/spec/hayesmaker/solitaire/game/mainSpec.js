define(
  [
    'lodash',
    'class',
    'phaser',
    'TweenMax',
    'pixijs',
    'modules/game/controller',
    'modules/board/controller',
    'game/main',
    'testHelpers/mocks'
  ],
  function(_, Class, Phaser, TweenMax, PIXI, GameController, BoardController, Main, Mock) {

     /**
     * rules
     * 1.  Game starts with a triple deck of shuffled cards dealt evenly to each player's draw pile.
     * 2.  Each player starts with a special 13 card pile from another deck of cards.
     * 3.  Cards are drawn 3 at a time from the draw pile when a player clicks on it, or removes all 3 of the current shown cards.
     * 4.  Game ends either when 1 player removes all of their special card pile or when both players become 'stuck'.
     * 5.  The winner is the player who has removed most cards from their special card pile when the game ends.
     * 6.  Each player has 4 empty row stacks to which they may move any card.
     * 7.  When there is 1 or more cards on a row stack, then the player may only put on a card of 1 value lower with a different colour.
     * 8.  There are also 8 shared stacks to which any player may move their cards.
     * 9.  A player may only put an Ace on an empty shared stack.
     * 10. If the shared stack contains 1 or more cards the player may only move a card of the same suit and 1 value higher.
     **/

     describe('Main Test', function() {

       var game, main, cloak;

       beforeEach(function() {
         cloak = Mock.mockCloak;
         game = Mock.mockGame;
         main = new Main();
         main.init(game, cloak);
       });

       it("Make sure game is initialised correctly", function() {
         expect(main).toBeDefined();
         //expect(main.gameController).toBeDefined();
       });


     });



  });