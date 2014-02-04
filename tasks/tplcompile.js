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
        "compiler": "underscore"
    });

    var fs = require('fs');
    var path = require('path');
    var mkdirp = require('mkdirp');

    var compiler = require('./compilers/' + options.compiler).init(grunt);
    var namespace = require('./namespaces/' + options.namespace).init(grunt);


    var dest_src = "";
    var added_namespaces = [];

    if (typeof options['prefix'] !== "undefined") {
        dest_src += fs.readFileSync(options['prefix']).toString();
    }


    if (typeof options['base'] !== 'undefined') {
        dest_src += "this['" + options['base'] + "'] = this['" + options['base'] + "'] || {};\n";

        added_namespaces.push(options['base']);
    }

    this.files.forEach(function(fileobj) {
        
        fileobj.src.forEach(function(src_file) {
            grunt.verbose.writeln("Processing " + src_file);
            var file_contents = fs.readFileSync(src_file).toString();
            var tpl_source = compiler.compile(file_contents);
            var nsstr = namespace.get_string(src_file);

            dest_src += nsstr;

            dest_src += "this" + arr_to_str(namespace.get_array(src_file)) + " = " + tpl_source + "\n\n";

        });

        console.log(JSON.stringify(fileobj));

        var dirname = path.dirname(fileobj.dest);

        mkdirp.sync(dirname, "0755");

        grunt.verbose.writeln("Created " + dirname);

        fs.writeFileSync(fileobj.dest, dest_src);
        
        console.log(dest_src);
    });

  });
};
