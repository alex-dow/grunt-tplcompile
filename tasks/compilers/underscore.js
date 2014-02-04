
exports.init = function(grunt) {

    grunt.log.writeln('Using underscore compiler');

    var exports = {};
   
    exports.compile = function(file_contents, options) {
        var _ = require('underscore');

        if (typeof _ == "undefined") {
            throw "Underscore module not found";
        }

        var tpl =  _.template(file_contents, options);
        return tpl.source;
    };

    return exports;
};

