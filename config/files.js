/* Exports an object that defines
 *  all of the paths & globs that the project
 *  is concerned with.
 *
 * The "configure" task will require this file and
 *  then re-initialize the grunt config such that
 *  directives like <config:files.js.app> will work
 *  regardless of the point you're at in the build
 *  lifecycle.
 *
 * You can find the parent object in: node_modules/lineman/config/files.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('files', {

  js: {
    vendor: {
      src: ["vendor/js/angular.js","vendor/js/**/*.js"],
      dest: "generated/js/vendor.js",
      minified: "dist/js/vendor.js"
    },
    common: {
      src: ["app/js/common/common.js","app/js/common/**/*.js"],
      dest: "generated/js/common.js",
      minified: "dist/js/common.js"
    },
    index: {
      src: ["app/js/index/index.js","app/js/index/router.js","app/js/index/**/*.js","generated/angular/tpl-index.js"],
      dest: "generated/js/index.js",
      minified: "dist/js/index.js"
    }
  },

  less: {
    compile: {
      options: {
        paths: ["vendor/css/normalize.css", "vendor/css/**/*.css", "app/css/**/*.less"]
      }
    }
  }
});
