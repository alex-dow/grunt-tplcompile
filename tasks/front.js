

exports.compile = function(grunt, files, options) {
    var fs = require('fs');
    var path = require('path');
    var mkdirp = require('mkdirp');

    var compiler = require('./compilers/' + options.compiler).init(grunt);
    var namespace = require('./namespaces/' + options.namespace).init(grunt);

    var arr_to_str = function(arr) {
        return "['" + arr.join("']['") + "']";
    };



    var dest_src = "";

    if (typeof options['prefix'] !== "undefined") {
        dest_src += fs.readFileSync(options['prefix']).toString();
    }


    files.forEach(function(fileobj) {
        
        fileobj.src.forEach(function(src_file) {

            grunt.verbose.writeln("Processing " + src_file);
            var file_contents = fs.readFileSync(src_file).toString();
            var tpl_source = compiler.compile(file_contents);
            var nsstr = namespace.get_string(src_file, options);

            
            dest_src += nsstr;

            dest_src += tpl_source + "\n\n";

        });

        var dirname = path.dirname(fileobj.dest);

        mkdirp.sync(dirname, "0755");

        grunt.verbose.writeln("Created " + dirname);

        fs.writeFileSync(fileobj.dest, dest_src);
        
        console.log(dest_src);
    });
};
