
var grunt = require('grunt');

exports.front = {
    'Writes the output file': function(test) {

        var fs = require('fs');
        var rimraf = require('rimraf');

        if (fs.existsSync('test/tmp')) {
            rimraf.sync('test/tmp');
        }

        var front = require('../tasks/front');
        
        var src_files = grunt.file.expand(["test/fixtures/**/*.html"]);
        var files = [{'src': src_files, 'dest': 'test/tmp/output.js'}];
        
        front.compile(grunt, files, {
            "namespace": "expanded",
            "compiler": "plaintext"
        });

        test.ok(fs.existsSync('test/tmp/output.js'));
        test.done();
    }
};
