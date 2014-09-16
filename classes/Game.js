var Dealer = require('./Dealer');
var AcePile = require('./AcePile');
var RowStack = require('./RowStack');

function Game () {
  this.dealer = new Dealer(3);
  this.specialDealer = new Dealer(1);
  this.pack = null;
  this.specialPack = null;
  this.acePiles = null;
  this.player1Stacks = null;
  this.player2Stacks = null;
};

Game.prototype.init = function() {
  this.pack = this.dealer.deal(156);
  this.specialPack = this.specialDealer.deal(26);
  this.acePiles = [];
  this.player1Stacks = [];
  this.player2Stacks = [];
  var i;
  for (i = 0; i < 8; i++)
  {
    var acePile = new AcePile();
    acePile.init();
    var rowStack = new RowStack();
    rowStack.init();
    this.acePiles.push(acePile);
    if (i < 4)
    {
      this.player1Stacks.push(rowStack);
    } else {
      this.player2Stacks.push(rowStack);
    }
  }
};

module.exports = Game;