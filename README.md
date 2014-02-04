# grunt-tplcompile

> Javascript Template Compiler

This is a multipurpose JST compiler frontend.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tplcompile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tplcompile');
```

## The "tplcompile" task

### Overview
In your project's Gruntfile, add a section named `tplcompile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tplcompile: {
    taskname: {
        options: {
            // Task-specific options go here.
        },
        files: {
            // Files to process
        }
    }
  },
});
```

### Options

#### options.compiler
Choices: `underscore` `lodash` `plaintext`
Default value: `'lodash '`

Which compiler to use. Note that only underscore is installed with `grunt-tplcompile`. To use lodash, you must manually
install the lodash library.

#### options.namespace
Choices: `expanded`

Default value: `'expanded'`

How to manage namespaces. As of v0.0.1, only "expanded" is available.

#### options.mask
Type: `String`
Default value: `''`

Mask part of the filename before using it for namespace processing

#### options.base
Type: `String`
Default value: `''`

Base namespace

### Usage Examples

```js
grunt.initConfig({
  tplcompile: {
    underscore: {
        options: {
            compiler: "underscore",
            namespace: "expanded",
            mask: "src/templates/",
        },
        files: {
            'target/compiled_tpl': ['src/templates/**/*.html']
        }
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.0.1

Initial commit.

### 0.0.2

Fixed a bug with writing files.
Added default values for namespace and compiler
Added masking to expanded namespace
Added plaintext compiler
Organized code a bit better
More unit tests

### 0.0.3

Bug fixes
Added working examples

