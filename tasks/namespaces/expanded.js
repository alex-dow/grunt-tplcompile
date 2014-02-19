

exports.init = function(grunt) {

    grunt.log.writeln("Using expanded namespaces");

    var exports = {
        added_namespaces: [],
    }

    var arr_to_str = function(arr) {
        return "['" + arr.join("']['") + "']";
    };

    exports.get_string = function(filename, options) {

        options = options || {};

        if ("mask" in options) {
            filename = filename.replace(options['mask'], '');
        }

        var ns_arr = ("base" in options)? this.get_array(filename, options['base']) : this.get_array(filename);

        
        var ns_str = "";

        for (var ns_pos = 0; ns_pos < ns_arr.length-1; ns_pos++) {
            var parent_nsarr = ns_arr.slice(0,ns_pos+1);
            var parent_nsstr = parent_nsarr.join('.');
            
            if (this.added_namespaces.indexOf(parent_nsstr) == -1) {
                var arrstr = arr_to_str(parent_nsarr);
                ns_str += 'this' + arrstr + ' = this' + arrstr + ' || {};\n';
                this.added_namespaces.push(parent_nsstr);
            }
        }
        ns_str += 'this' + arr_to_str(ns_arr) + ' = ';

        return ns_str;

    };

    exports.get_array = function(filename, base) {

        fnparts = filename.split('/');

        if (fnparts[0] == '.') {
            fnparts = fnparts.shift();
        }

        if (fnparts[0] == '..') {
            fnparts = fnaprts.shift();
        }

        fnparts[fnparts.length-1] = fnparts[fnparts.length-1].split('.').slice(0,-1);

        if (typeof base == "string") {
            fnparts = base.split('/').concat(fnparts); 
        } else if (typeof base == "array") {
            fnparts = base.concat(fnparts);
        }

        return fnparts;
    };

    return exports;

};
