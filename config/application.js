/* Exports an object that defines
 *  all of the configuration needed by the projects'
 *  depended-on grunt tasks.
 *
 * You can find the parent object in: node_modules/lineman/config/application.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('application', {

  // html5push state simulation
  server: {
    pushState: true
  },

  // configure lineman to load additional angular related npm tasks
  loadNpmTasks: [
    "grunt-angular-templates",
    "grunt-concat-sourcemap",
    "grunt-ngmin"
  ],

  // we don't use the lineman default concat, handlebars, and jst tasks by default
  removeTasks: {
    common: ["concat", "handlebars", "jst"]
  },

  // task override configuration
  prependTasks: {
    dist: ["ngmin"],         // ngmin should run in dist only
    common: ["ngtemplates"] // ngtemplates runs in dist and dev
  },

  // swaps concat_sourcemap in place of vanilla concat
  appendTasks: {
    common: ["concat_sourcemap"]
  },

  // configuration for grunt-angular-templates
  ngtemplates: {
    index: {
      options: {
        base: "app/js"
      },
      src: "app/js/index/templates/*.html",
      dest: "generated/angular/tpl-index.js"
    }
  },

  // configuration for grunt-ngmin, this happens _after_ concat once, which is the ngmin ideal :)
  ngmin: {
    js:{
      files: {
        "<%= files.js.common.dest %>" : ["<%= files.js.common.dest %>"],
        "<%= files.js.index.dest %>" : ["<%= files.js.index.dest %>"]
      }
    }
  },

  // generates a sourcemap for js, specs, and css with inlined sources
  // grunt-angular-templates expects that a module already be defined to inject into
  // this configuration orders the template inclusion _after_ the app level module
  concat_sourcemap: {
    options: {
      sourcesContent: true
    },
    js: {
      files: {
        "<%= files.js.vendor.dest %>" : ["<%= files.js.vendor.src %>"],
        "<%= files.js.common.dest %>" : ["<%= files.js.common.src %>"],
        "<%= files.js.index.dest %>" : ["<%= files.js.index.src %>"]
      }
    },
    spec: {
      src: ["<%= files.js.specHelpers %>", "<%= files.coffee.generatedSpecHelpers %>", "<%= files.js.spec %>", "<%= files.coffee.generatedSpec %>"],
      dest: "<%= files.js.concatenatedSpec %>"
    },
    css: {
      src: ["<%= files.less.generatedVendor %>", "<%= files.sass.generatedVendor %>", "<%= files.css.vendor %>", "<%= files.less.generatedApp %>", "<%= files.sass.generatedApp %>", "<%= files.css.app %>"],
      dest: "<%= files.css.concatenated %>"
    }
  },

  uglify:{
    options:{
      banner: "<%= meta.banner %>"
    },
    js:{
      files:{
        "<%= files.js.vendor.minified %>" : ["<%= files.js.vendor.dest %>"],
        "<%= files.js.common.minified %>" : ["<%= files.js.common.dest %>"],
        "<%= files.js.index.minified %>" : ["<%= files.js.index.dest %>"]
      }
    }
  },

  // configures grunt-watch-nospawn to listen for changes to
  // and recompile angular templates, also swaps lineman default
  // watch target concat with concat_sourcemap
  watch: {
    ngtemplates: {
      files: ["app/js/**/*.html"],
      tasks: ["ngtemplates", "concat_sourcemap:js"]
    },
    js: {
      files: ["<%= files.js.vendor.src %>", "<%= files.js.common.src %>", "<%= files.js.index.src %>"],
      tasks: ["concat_sourcemap:js"]
    },
    jsSpecs: {
      files: ["<%= files.js.specHelpers %>", "<%= files.js.spec %>"],
      tasks: ["concat_sourcemap:spec"]
    },
    css: {
      files: ["<%= files.css.vendor %>", "<%= files.css.app %>"],
      tasks: ["concat_sourcemap:css"]
    },
    less: {
      files: ["<%= files.less.vendor %>", "<%= files.less.app %>"],
      tasks: ["less", "concat_sourcemap:css"]
    },
    sass: {
      files: ["<%= files.sass.vendor %>", "<%= files.sass.app %>"],
      tasks: ["sass", "concat_sourcemap:css"]
    }
  }

});
