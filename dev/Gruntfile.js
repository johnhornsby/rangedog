module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['../src/RangeDog.js'],
        tasks: ['babel', 'exec'],
        options: {
          spawn: false,
        },
      },
    },

    babel: {
      options: {
        sourceMap: false,
        stage: 0
      },
      dist: {
        files: {
          '../lib/RangeDog.js': '../src/RangeDog.js'
        }
      }
    },

    exec: {
      webpack: {
        cmd: 'webpack',
        cwd: '../'
      }
    }

  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['babel', 'exec', 'watch']);

};