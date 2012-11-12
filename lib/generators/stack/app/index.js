  
var util = require('util'),
    path = require('path'),
    ScriptBase = require('../script-base.js'),
    yeoman = require('../../../../');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
  this.appname = path.basename(process.cwd());
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
  this.template('app', 'client/js/app');
};

Generator.prototype.createMainFiles = function createMainFiles() {
  this.htmlTemplate('../common/index.html', 'client/index.html');
};
