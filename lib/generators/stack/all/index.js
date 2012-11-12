
var path = require('path'),
  util = require('util'),
  yeoman = require('../../../../');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  this.option('coffee');
  this.appname = path.basename(process.cwd());
  
  var args = ['main'];

  if (this.options.coffee) {
    args.push('--coffee');
  }

  this.hookFor('stack:common', {
    args: args
  });

  this.hookFor('stack:app', {
    args: args
  });
  this.hookFor('stack:controller', {
    args: args
  });
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askFor = function askFor(argument) {
  var cb = this.async();
  var self = this;

  var prompts = [{
    name: 'bootstrap',
    message: 'Would you like to include Twitter Bootstrap?',
    default: 'Y/n',
    warning: 'Yes: All Twitter Bootstrap files will be placed into the client/css directory.'
  }];

  this.prompt(prompts, function(e, props) {
    if (e) {
      return self.emit('error', e);
    }
    self.bootstrap = (/y/i).test(props.bootstrap);
    // we're done, go through next step
    cb();
  });
};

// Duplicated from the SASS generator, waiting a solution for #138
Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  if (this.bootstrap) {
    this.log.writeln('Writing compiled Bootstrap');
    this.copy( 'bootstrap.css', 'client/css/bootstrap.css' );
    this.copy( 'bootstrap-responsive.css', 'client/css/bootstrap-responsive.css' );
    this.copy( 'bootstrap.min.css', 'client/css/bootstrap.min.css' );
    this.copy( 'bootstrap-responsive.min.css', 'client/css/bootstrap-responsive.min.css' );
  }
};

// rewrite index.html
