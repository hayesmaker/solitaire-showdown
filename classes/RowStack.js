
function RowStack() {

  this.cards = null;

};

RowStack.prototype.addCard = function(cardName)
{
  this.cards.push(cardName);
};

RowStack.prototype.removeCard = function(cardName)
{
  var cardIndex = this.cards.indexOf(cardName);
  this.cards.splice(cardIndex);
};

RowStack.prototype.init = function() {

  this.cards = [];

};

module.exports = RowStack;