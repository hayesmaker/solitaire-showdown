define([], function() {
  var suits = ['c','s','h','d'];
  var numbers = ['a','2','3','4','5','6','7','8','9','10','j','q','k'];

  var _getRandom = function(getImageUrl) {
    var getRandomSuit = suits[Math.floor(Math.random() * suits.length)];
    var getRandomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    if (getImageUrl) {
      return _getByName(getRandomNumber, getRandomSuit);
    } else {
      return getRandomNumber + getRandomSuit;
    }

  };

  var _getBackFace = function() {
    return 'card-back-blue.png';
  };

  var _getByName = function(name) {
    var cardMap = {
      'ac' : 'card-00.png',
      '2c' : 'card-01.png',
      '3c' :  'card-02.png',
      '4c' :  'card-03.png',
      '5c' :  'card-04.png',
      '6c' :  'card-05.png',
      '7c' :  'card-06.png',
      '8c' :  'card-07.png',
      '9c' :  'card-08.png',
      '10c' :  'card-09.png',
      'jc' :  'card-10.png',
      'qc' :  'card-11.png',
      'kc' :  'card-12.png',

      'as' :  'card-13.png',
      '2s' :  'card-14.png',
      '3s' :  'card-15.png',
      '4s' :  'card-16.png',
      '5s' :  'card-17.png',
      '6s' :  'card-18.png',
      '7s' :  'card-19.png',
      '8s' :  'card-20.png',
      '9s' :  'card-21.png',
      '10s' :  'card-22.png',
      'js' :  'card-23.png',
      'qs' :  'card-24.png',
      'ks' :  'card-25.png',

      'ah' : 'card-26.png',
      '2h' : 'card-27.png',
      '3h' :  'card-28.png',
      '4h' :  'card-29.png',
      '5h' :  'card-30.png',
      '6h' :  'card-31.png',
      '7h' :  'card-32.png',
      '8h' :  'card-33.png',
      '9h' :  'card-34.png',
      '10h' :  'card-35.png',
      'jh' :  'card-36.png',
      'qh' :  'card-37.png',
      'kh' :  'card-38.png',

      'ad' :  'card-39.png',
      '2d' :  'card-40.png',
      '3d' :  'card-41.png',
      '4d' :  'card-42.png',
      '5d' :  'card-43.png',
      '6d' :  'card-44.png',
      '7d' :  'card-45.png',
      '8d' :  'card-46.png',
      '9d' :  'card-47.png',
      '10d' :  'card-48.png',
      'jd' :  'card-49.png',
      'qd' :  'card-50.png',
      'kd' :  'card-51.png'
    };
    return cardMap[name];
  };

  return {
    getRandom: _getRandom,
    getByName: _getByName,
    getBackFace: _getBackFace
  };
});