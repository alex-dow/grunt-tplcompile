/*
 * grunt-tplcompile
 * https://github.com/v0idnull/grunt-tplcompile
 *
 * Copyright (c) 2014 v0idnull
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    tplcompile: {
        underscore: {
            options: {
                'mask': 'examples/',
                'base': 'templates'
            },
            files: {
                "target/output/templates-underscore.js": ["examples/underscore/**/*.html"]
            }
        },
        plaintext: {
            options: {
                'mask': 'examples/',
                'base': 'templates'
            },
            files: {
                "target/output/templates-plaintext.js": ["examples/plaintext/**/*.html"]
            }
        }
    },

    concat: {
        options: {
            separator: "\n\n"
        },
        templates: {
            files: {
                'target/output/templates.js': ['target/output/templates-underscore.js', 'target/output/templates-plaintext.js']
            }
        }
    },
        

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-tplcompile');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('examples', ['tplcompile:underscore', 'tplcompile:plaintext', 'concat:templates']);

};
