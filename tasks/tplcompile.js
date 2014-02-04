/*
 * grunt-tplcompile
 * https://github.com/v0idnull/grunt-tplcompile
 *
 * Copyright (c) 2014 v0idnull
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var arr_to_str = function(arr) {
    return "['" + arr.join("']['") + "']";
  };

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tplcompile', 'Javascript Template Compiler', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        "namespace": "expanded",
        "compiler": "underscore",
    });

    var front = require('./front');
    front.compile(grunt, this.files, options);
  });
};
