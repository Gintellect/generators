
var path = require('path'),
  util = require('util'),
  ScriptBase = require('../script-base.js'),
  grunt = require('grunt'),
  angularUtils = require('../util.js');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);

  this.appname = path.basename(process.cwd());
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
  this.template('directive', 'client/js/directives/' + this.name);
  this.template('spec/directive', 'test/spec/directives/' + this.name);
};

Generator.prototype.rewriteIndexHtml = function() {
  var file = 'client/index.html';
  var body = grunt.file.read(file);
  
  body = angularUtils.rewrite({
    needle: '<!-- endbuild -->',
    haystack: body,
    splicable: [
      '<script src="js/directives/' + this.name + '.js"></script>'
    ]
  });

  grunt.file.write(file, body);
};
