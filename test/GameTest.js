var Game = require('../classes/Game');
var Dealer = require('../classes/Dealer');
var assert = require('assert');
var AcePile = require('../classes/AcePile');
var RowStack = require('../classes/RowStack');

describe('Game Tests', function() {

  var game;

  beforeEach(function() {
    game = new Game();
  });

  describe('Game is instantiated properly', function() {

    it('Should create a normal deck dealer', function(){
      game.dealer.should.be.an.instanceOf(Dealer);
    });

    it('Should create a special deck dealer', function(){
      game.specialDealer.should.be.an.instanceOf(Dealer);
    });

    it('Should initialise a null pack', function() {
      (game.pack === null).should.be.true;
    });

    it('Should initialise a null special pack', function() {
      (game.specialPack === null).should.be.true;
    });

    it('Should initialise a null acePiles array', function() {
      (game.acePiles === null).should.be.true;
    });

    it('Should initialise a null player1Stacks array', function() {
      (game.player1Stacks === null).should.be.true;
    });

    it('Should initialise a null player2Stacks array', function() {
      (game.player2Stacks === null).should.be.true;
    });

    describe('Game init should initialise game vars corretly', function() {

      beforeEach(function() {
        game.init();
      });

      it('A triple deck of 156 cards is created', function() {
        game.pack.length.should.be.exactly(156);
      });

      it('A special deck of 26 cards is created', function() {
        game.specialPack.length.should.be.exactly(26);
      });

      it('8 New AcePiles are created', function() {
        game.acePiles.length.should.be.exactly(8);
        game.acePiles[0].should.be.an.instanceOf(AcePile);
        game.acePiles[1].should.be.an.instanceOf(AcePile);
        game.acePiles[2].should.be.an.instanceOf(AcePile);
        game.acePiles[3].should.be.an.instanceOf(AcePile);
        game.acePiles[4].should.be.an.instanceOf(AcePile);
        game.acePiles[5].should.be.an.instanceOf(AcePile);
        game.acePiles[6].should.be.an.instanceOf(AcePile);
        game.acePiles[7].should.be.an.instanceOf(AcePile);
      });

      it('4 Player 1 RowStacks are created', function() {
        game.player1Stacks.length.should.be.exactly(4);
        game.player1Stacks[0].should.be.an.instanceOf(RowStack);
        game.player1Stacks[1].should.be.an.instanceOf(RowStack);
        game.player1Stacks[2].should.be.an.instanceOf(RowStack);
        game.player1Stacks[3].should.be.an.instanceOf(RowStack);
      });

      it('4 Player 2 RowStacks are created', function() {
        game.player2Stacks.length.should.be.exactly(4);
        game.player2Stacks[0].should.be.an.instanceOf(RowStack);
        game.player2Stacks[1].should.be.an.instanceOf(RowStack);
        game.player2Stacks[2].should.be.an.instanceOf(RowStack);
        game.player2Stacks[3].should.be.an.instanceOf(RowStack);
      });


      /**
       * 4d::1::0::rowStack
       *
       Game.prototype.move = function(arg) {
          var arguments = arg.split('::');
          var cardName = arguments[0];
          var player = arguments[1];
          var dropStackIndex = arguments[2];
          var type = arguments[3];
          console.log('{Game} move :: cardName,player,dropStackIndex=', cardName, player, dropStackIndex, type);
          if (type === 'acePile') {
            this.acePiles[dropStackIndex].addCard(cardName);
          } else if (type === 'rowStack') {
            if (player === 1) {
              this.player1Stacks[dropStackIndex].addCard(cardName);
            } else if (player ===2) {
              this.player2Stacks[dropStackIndex].addCard(cardName);
            } else {
              console.warn('unknown player number: ', player);
            }
          } else {
            console.warn('unknown pile type:' , type);
          }
        }
       */
      describe('Game.move adds correct card to correct piles', function() {

        it('A player moves an Ace Hearts to the first acePile', function() {
          game.move('ah::2::-1::draw::0::acePile');
          game.acePiles[0].cards[0].should.be.exactly('ah');
        });

        it('A player moves an Ace Clubs to the second acePile', function() {
          game.move('ac::2::-1::draw::1::acePile');
          game.acePiles[1].cards[0].should.be.exactly('ac');
        });

        it('Player 1 moves a King Diamonds to his 3rd RowStack', function() {
          game.move('kd::1::-1::draw::2::rowStack');
          game.player1Stacks[2].cards[0].should.be.exactly('kd');
        });

        it('Player 1 moves a Three of Spades to his 4th RowStack', function() {
          game.move('3s::1::-1::draw::3::rowStack');
          game.player1Stacks[3].cards[0].should.be.exactly('3s');
        });
      });

      describe('Game.move removes cards correctly when moved from one pile to another', function() {

        it('A player moves Ace Hearts to the first rowStack, then moves it to another empty rowStack', function() {
          game.move('ah::1::-1::draw::0::rowStack');
          game.player1Stacks[0].cards[0].should.be.exactly('ah');
          game.move('ah::1::0::draw::2::rowStack');
          game.player1Stacks[2].cards[0].should.be.exactly('ah');
          game.player1Stacks[0].cards.length.should.be.exactly(0);
        });

      });
  });



  });



});