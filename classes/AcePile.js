
function AcePile() {

  this.cards = null;

};

AcePile.prototype.init = function() {

  this.cards = [];

};

AcePile.prototype.addCard = function(cardName)
{
  this.cards.push(cardName);
};

module.exports = AcePile;