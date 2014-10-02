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
 *
 * @param arg
 * @arg cardName::player::dropStackIndex::type
 * @example 4d::1::0::rowStack
 *
 */
Game.prototype.move = function(arg) {
  var arguments = arg.split('::');
  var cardName = arguments[0];
  var player = parseInt(arguments[1], 10);
  var dropStackIndexFrom = parseInt(arguments[2], 10);
  var dropStackFromType = arguments[3];
  var dropStackIndexTo = parseInt(arguments[4], 10);
  var type = arguments[5];
  console.log('{Game} move :: cardName,player,indexFrom,indexTo,type=', cardName, player, dropStackIndexFrom, dropStackIndexTo, type);
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