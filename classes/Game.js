var Dealer = require('./Dealer');
var AcePile = require('./AcePile');
var RowStack = require('./RowStack');
var cloak = require('cloak');

/**
 *
 * @constructor
 */
function Game () {
  this.dealer = new Dealer(3);
  this.specialDealer = new Dealer(1);
  this.pack = null;
  this.specialPack = null;
  this.acePiles = null;
  this.player1Stacks = null;
  this.player2Stacks = null;
};


/**
 *

 */
Game.prototype.init = function() {
  this.pack = this.dealer.deal(156);
  this.specialPack = this.specialDealer.deal(26);
  this.acePiles = ['', '', '', '', '', '', '', ''];
  this.player1Stacks = ['', '', '', ''];
  this.player2Stacks = ['', '', '', ''];
  var i;
  for (i = 0; i < 8; i++)
  {
    var acePile = new AcePile();
    acePile.init();
    var rowStack = new RowStack();
    rowStack.init();
    this.acePiles[i] = acePile;
    if (i < 4)
    {
      this.player1Stacks[i] = rowStack
    } else {
      this.player2Stacks[i - 4] = rowStack;
    }
  }
};

Game.prototype.draw3Cards = function(arg) {
  var playerNum = parseInt(arg, 10);
  console.log('{Game} draw3Cards :: arg=', playerNum);
  cloak.messageAll('drawCards', {
    playerNum: playerNum
  });
};

/**
 * name: '5c',
   player: 1,
   dropFromIndex: -1,
   dropFromType: 'draw',
   dropToIndex: 1,
   dropToType: 'rowStack',
   includePile: 0 }
 * @param arg
 */
Game.prototype.move = function(arg) {
  var cardName = arg.name;
  var player = arg.player;
  var dropStackIndexFrom = arg.dropFromIndex;
  var dropStackFromType = arg.dropFromType;
  var dropStackIndexTo = arg.dropToIndex;
  var type = arg.dropToType;
  if (type === 'acePile') {
    this.acePiles[dropStackIndexTo].addCard(cardName);
  } else if (type === 'rowStack') {
    if (player === 1) {
      this.player1Stacks[dropStackIndexTo].addCard(cardName);
      if (dropStackIndexFrom >= 0)
      {
        this.player1Stacks[dropStackIndexFrom].removeCard(cardName);
      }
    } else if (player ===2) {
      this.player2Stacks[dropStackIndexTo].addCard(cardName);
      if (dropStackIndexFrom >= 0)
      {
        this.player2Stacks[dropStackIndexFrom].removeCard(cardName);
      }
    } else {
      console.warn('unknown player number: ', player);
    }
  } else {
    console.warn('unknown pile type:' , type);
  }

  cloak.messageAll('gameMove', {
    cardName: cardName,
    player: player,
    dropStackIndexFrom: dropStackIndexFrom,
    dropStackFromType: dropStackFromType,
    dropStackIndexTo: dropStackIndexTo,
    type: type
  });
};

module.exports = Game;