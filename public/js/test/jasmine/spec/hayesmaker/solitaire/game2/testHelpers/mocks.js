define(['class', 'jasmineSignals', 'signals'], function(Class, spyOnSignal, Signal) {


    var Card = function(name) {
      return {
        name: name,
        init: function() {  },
        setDropPoints: function() {},
        enableClick: function() {  },
        drawerPileClicked: new Signal(),
        cardLanded: new Signal(),
        showFace: jasmine.createSpy('showFace spy'),
        enableDrag: jasmine.createSpy('enableDrag spy'),
        onDragStop: jasmine.createSpy('onDragStop spy')
      };
    };


    return {
      mockCard: {
          name: 'ah',
            init: function() {  },
          setDropPoints: function() {},
          enableClick: function() {  },
          drawerPileClicked: new Signal(),
          cardLanded: new Signal()
      },

      getCard: function(name) {
        return new Card(name);
      },

      mockDeck: [
        new Card('ah'),
        new Card('2h'),
        new Card('3h'),
        new Card('4h'),
        new Card('5h'),
        new Card('6h'),
        new Card('7h'),
        new Card('8h'),
        new Card('9h'),
        new Card('10h'),
        new Card('jh'),
        new Card('qh'),
        new Card('kh'),

        new Card('ac'),
        new Card('2c'),
        new Card('3c'),
        new Card('4c'),
        new Card('5c'),
        new Card('6c'),
        new Card('7c'),
        new Card('8c'),
        new Card('9c'),
        new Card('10c'),
        new Card('jc'),
        new Card('qc'),
        new Card('kc'),

        new Card('ad'),
        new Card('2d'),
        new Card('3d'),
        new Card('4d'),
        new Card('5d'),
        new Card('6d'),
        new Card('7d'),
        new Card('8d'),
        new Card('9d'),
        new Card('10d'),
        new Card('jd'),
        new Card('qd'),
        new Card('kd'),

        new Card('as'),
        new Card('2s'),
        new Card('3s'),
        new Card('4s'),
        new Card('5s'),
        new Card('6s'),
        new Card('7s'),
        new Card('8s'),
        new Card('9s'),
        new Card('10s'),
        new Card('js'),
        new Card('qs'),
        new Card('ks')
      ],


      mockGame: {
        add: {

          sprite: function(x, y, label) {
            return {
              frameName: jasmine.createSpy("frameName"),

              input: {

                enableDrag: jasmine.createSpy("input :: enableDrag")

              }
            };
          },

          graphics: function(x, y) {
            //do nothing;
            return {
              beginFill: jasmine.createSpy("beginFill"),
              lineStyle: jasmine.createSpy("lineStyle"),
              drawRect: jasmine.createSpy("drawRect"),
              endFill: jasmine.createSpy("endFill")
            };
          }
        }
      }
    };



});