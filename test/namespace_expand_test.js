var grunt = require('grunt');

exports.namespace_expand = {
    'Test single file expansion': function(test) {

        var ns = require('../tasks/namespaces/expanded').init(grunt);

        var filename = 'foobar.html';

        var ns_str = ns.get_string(filename);
        
        test.equal(ns_str, "this['foobar'] = ");

        test.done();
    },

    'Test single file expansion - 1 level': function(test) {
        var ns = require('../tasks/namespaces/expanded').init(grunt);
        var filename = 'foo/bar.html';
        var ns_str = ns.get_string(filename);

        test.equal(ns_str, "this['foo'] = this['foo'] || {};\nthis['foo']['bar'] = ");
        test.done();
    },

    'Test single file expansion - 2 levels': function(test) {
        var ns = require('../tasks/namespaces/expanded').init(grunt);
        var filename = 'for/great/power.js';
        var ns_str = ns.get_string(filename);

        test.equal(ns_str, "this['for'] = this['for'] || {};\nthis['for']['great'] = this['for']['great'] || {};\nthis['for']['great']['power'] = ");
        test.done();
    },

    'Test single file expansion - 3 levels': function(test) {
        var ns = require('../tasks/namespaces/expanded').init(grunt);
        var filename = 'this/is/a/test.html';
        var ns_str = ns.get_string(filename);

        test.equal(ns_str, "this['this'] = this['this'] || {};\nthis['this']['is'] = this['this']['is'] || {};\nthis['this']['is']['a'] = this['this']['is']['a'] || {};\nthis['this']['is']['a']['test'] = ");
        test.done();
    },

    'Test base namespace': function(test) {
        var ns = require('../tasks/namespaces/expanded').init(grunt);
        var filename = 'foo/bar.html';
        var ns_str = ns.get_string(filename, {
            base: 'basename'
        });

        test.equal(ns_str, "this['basename'] = this['basename'] || {};\nthis['basename']['foo'] = this['basename']['foo'] || {};\nthis['basename']['foo']['bar'] = ");
        test.done();
    },

    'Test masking': function(test) {
        var ns = require('../tasks/namespaces/expanded').init(grunt);

        var filename = 'hello/world/foo/bar.html';
        var ns_str = ns.get_string(filename, {
            mask: 'hello/world/',
            base: 'basename'
        });

        test.equal(ns_str, "this['basename'] = this['basename'] || {};\nthis['basename']['foo'] = this['basename']['foo'] || {};\nthis['basename']['foo']['bar'] = ");
        test.done();
    }
};
