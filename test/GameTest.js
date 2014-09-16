var Game = require('../classes/Game');
var Dealer = require('../classes/Dealer')
var assert = require('assert');

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

  });

  describe('Game init should create a triple deck special deck', function() {

    it('init a triple deck of 156 cards', function() {
      game.init();
      game.pack.length.should.be.exactly(156);
    });

    it('init a special deck of 26 cards', function() {
      game.init();
      game.specialPack.length.should.be.exactly(26);
    });

  });



});