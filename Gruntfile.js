module.exports = function(grunt){
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['public/sass/**/*.scss', 'public/js/**/*.js'],
        tasks: ['compass', 'jshint'],
        options: {
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'public/js/src/app/**/*.js', 'public/js/test/jasmine/spec/**/*.js']
    },
    typescript: {
      base: {
        src: ['public/ts/**/*.ts'],
        dest: 'public/js/lib/hayesmaker/js/hayesmaker-solitaire.js',
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          base_path: 'public/ts',
          sourcemap: false,
          fullSourceMapPath: false,
          declaration: false
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'public/config.rb'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');

  grunt.registerTask('default', ['compass', 'jshint']);
};




