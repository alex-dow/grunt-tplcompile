var grunt = require('grunt');

exports.compiler_plaintext = {
    'Test single line': function(test) {
        var compiler = require('../tasks/compilers/plaintext').init(grunt);
            
        var contents = "This isn't just any kind of \"test\"";

        var compiled = compiler.compile(contents);
        
        test.equal(compiled, "\"This isn\\'t just any kind of \\\"test\\\"\";");

        test.done();
    },

    'Test two lines': function(test) {
        var compiler = require('../tasks/compilers/plaintext').init(grunt);

        var contents = "Line one.\nLine Two";

        var compiled = compiler.compile(contents);

        test.equal(compiled, "\"Line one. \\ \nLine Two\";");
        test.done();
    }

};
