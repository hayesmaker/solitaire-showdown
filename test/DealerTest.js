var Dealer = require('../classes/Dealer');
var assert = require('assert');
var should = require('should');
var _ = require('lodash');

var arrayContainsJustOne = function(array, val) {
  var firstIndex = _.indexOf(array, val);
  if (firstIndex === -1)
  {
    throw "value not found in array";
    return false;
  } else {
    if (_.indexOf(array, val, firstIndex + 1) === -1)
    {
      return true;
    } else {
      throw "value found more than once";
      return false;
    }
  }
};

describe('Dealer tests', function() {

  describe('Can create a pack of playing cards', function() {
    var dealer;

    beforeEach(function() {
      dealer = new Dealer(1);
    });

    it('should create a pack of 52 cards', function(){
      assert.equal(52, dealer.pack.length);
    });

    it('should create a pack of unique playing cards', function() {
      arrayContainsJustOne(dealer.pack, 'ah').should.be.true;
      arrayContainsJustOne(dealer.pack, '2h').should.be.true;
      arrayContainsJustOne(dealer.pack, '3h').should.be.true;
      arrayContainsJustOne(dealer.pack, '4h').should.be.true;
      arrayContainsJustOne(dealer.pack, '5h').should.be.true;
      arrayContainsJustOne(dealer.pack, '6h').should.be.true;
      arrayContainsJustOne(dealer.pack, '7h').should.be.true;
      arrayContainsJustOne(dealer.pack, '8h').should.be.true;
      arrayContainsJustOne(dealer.pack, '9h').should.be.true;
      arrayContainsJustOne(dealer.pack, '10h').should.be.true;
      arrayContainsJustOne(dealer.pack, 'jh').should.be.true;
      arrayContainsJustOne(dealer.pack, 'qh').should.be.true;
      arrayContainsJustOne(dealer.pack, 'kh').should.be.true;

      arrayContainsJustOne(dealer.pack, 'ac').should.be.true;
      arrayContainsJustOne(dealer.pack, '2c').should.be.true;
      arrayContainsJustOne(dealer.pack, '3c').should.be.true;
      arrayContainsJustOne(dealer.pack, '4c').should.be.true;
      arrayContainsJustOne(dealer.pack, '5c').should.be.true;
      arrayContainsJustOne(dealer.pack, '6c').should.be.true;
      arrayContainsJustOne(dealer.pack, '7c').should.be.true;
      arrayContainsJustOne(dealer.pack, '8c').should.be.true;
      arrayContainsJustOne(dealer.pack, '9c').should.be.true;
      arrayContainsJustOne(dealer.pack, '10c').should.be.true;
      arrayContainsJustOne(dealer.pack, 'jc').should.be.true;
      arrayContainsJustOne(dealer.pack, 'qc').should.be.true;
      arrayContainsJustOne(dealer.pack, 'kc').should.be.true;

      arrayContainsJustOne(dealer.pack, 'ad').should.be.true;
      arrayContainsJustOne(dealer.pack, '2d').should.be.true;
      arrayContainsJustOne(dealer.pack, '3d').should.be.true;
      arrayContainsJustOne(dealer.pack, '4d').should.be.true;
      arrayContainsJustOne(dealer.pack, '5d').should.be.true;
      arrayContainsJustOne(dealer.pack, '6d').should.be.true;
      arrayContainsJustOne(dealer.pack, '7d').should.be.true;
      arrayContainsJustOne(dealer.pack, '8d').should.be.true;
      arrayContainsJustOne(dealer.pack, '9d').should.be.true;
      arrayContainsJustOne(dealer.pack, '10d').should.be.true;
      arrayContainsJustOne(dealer.pack, 'jd').should.be.true;
      arrayContainsJustOne(dealer.pack, 'qd').should.be.true;
      arrayContainsJustOne(dealer.pack, 'kd').should.be.true;

      arrayContainsJustOne(dealer.pack, 'as').should.be.true;
      arrayContainsJustOne(dealer.pack, '2s').should.be.true;
      arrayContainsJustOne(dealer.pack, '3s').should.be.true;
      arrayContainsJustOne(dealer.pack, '4s').should.be.true;
      arrayContainsJustOne(dealer.pack, '5s').should.be.true;
      arrayContainsJustOne(dealer.pack, '6s').should.be.true;
      arrayContainsJustOne(dealer.pack, '7s').should.be.true;
      arrayContainsJustOne(dealer.pack, '8s').should.be.true;
      arrayContainsJustOne(dealer.pack, '9s').should.be.true;
      arrayContainsJustOne(dealer.pack, '10s').should.be.true;
      arrayContainsJustOne(dealer.pack, 'js').should.be.true;
      arrayContainsJustOne(dealer.pack, 'qs').should.be.true;
      arrayContainsJustOne(dealer.pack, 'ks').should.be.true;
    });



  });
});