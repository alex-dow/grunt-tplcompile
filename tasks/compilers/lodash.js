
exports.init = function(grunt) {

    grunt.log.writeln('Using lodash compiler');

    var exports = {};
   
    exports.compile = function(file_contents, options) {
        var _ = require('lodash');
        var tpl =  _.template(file_contents, options);
        return tpl.source;
    };

    return exports;
};

