require.config({
  baseUrl: '',
  paths: {
    //test deps
    'app' : '../../src/app',
    'jasmine': 'lib/jasmine/jasmine',
    'jasmine-html': 'lib/jasmine/jasmine-html',
    'spec': '/spec/',
    'jquery' : 'lib/jquery/jquery-2.0.3',
    'jasmineSignals': 'lib/jasmine/jasmine-signals',

    //app deps
    'class' : '../../src/lib/classjs/js/Class',
    'phaser': '../../src/lib/phaser/js/phaser-solo',
    'signals': '../../src/lib/signals/js/signals',
    'pixijs' : '../../src/lib/pixijs/js/pixi.dev',
    'TweenMax' : '../../src/lib/greensocks/uncompressed/TweenMax',
    'TweenPlugins' : '../../src/lib/greensocks/uncompressed/plugins',
    'lodash' : '../../src/lib/lodash/js/lodash',
    'game' : '../../src/app/hayesmaker/solitaire/game2',
    'modules' : '../../src/app/hayesmaker/solitaire/game2/modules',
    'components' : '../../src/app/hayesmaker/solitaire/game2/components',
    'utils' : '../../src/app/hayesmaker/solitaire/game2/utils',
    'testHelpers' : 'spec/hayesmaker/solitaire/game2/testHelpers'
  },
  shim: {
    'jasmineSignals' : {
      deps: ['signals']
    },
    'class' : {
      exports: 'Class'
    },
    'pixijs': {
      exports: 'PIXI'
    },
    'phaser': {
      deps: ['pixijs']
    },
    'TweenMax' : {
      exports: 'TweenMax'
    },
    'TweenPlugins/ThrowPropsPlugin' : {
      exports: 'ThrowPropsPlugin'
    },
    'jquery': {
      exports: 'jquery'
    },
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});


require(['jquery', 'jasmine-html'], function ($, jasmine) {

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function (spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];
  specs.push('spec/hayesmaker/solitaire/game2/mainSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/components/cardSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/game/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/game/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/game/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/rules/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/rules/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/rules/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/player/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/player/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/player/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/board/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/board/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/board/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/rowStack/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/rowStack/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/rowStack/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/acePile/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/acePile/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/acePile/controllerSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/specialPile/viewSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/specialPile/modelSpec.js');
  specs.push('spec/hayesmaker/solitaire/game2/modules/specialPile/controllerSpec.js');

  $(function () {
    require(specs, function () {
      console.log('*** Specs ready ');
      jasmineEnv.execute();
    });
  });

});