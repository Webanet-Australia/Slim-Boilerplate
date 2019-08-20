"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * Preset - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2018-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %>\n',
  ' */\n',
  '\n'
].join('');

let vendorDir = './public/assets/vendor/';

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del([vendorDir]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {

  // Bootstrap JS
  var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
    .pipe(gulp.dest(vendorDir + 'bootstrap/js'));
  // Bootstrap SCSS
  var bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
    .pipe(gulp.dest(vendorDir + 'bootstrap/scss'));

  // Bootstrap CSS (landing page)
  var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(vendorDir + 'bootstrap/css'))

  var popper = gulp.src(['./node_modules/popper.js/dist/umd/popper.min.js', './node_modules/popper.js/dist/umd/popper.min.js.map'])
    .pipe(gulp.dest(vendorDir + 'popper'));
  // ChartJS
  //var chartJS = gulp.src('./node_modules/chart.js/dist/*.js')
  //  .pipe(gulp.dest(vendorDir + 'chart.js'));
  // dataTables
  //var dataTables = gulp.src([
  //    './node_modules/datatables.net/js/*.js',
  //    './node_modules/datatables.net-bs4/js/*.js',
  //    './node_modules/datatables.net-bs4/css/*.css'
  //  ])
  //  .pipe(gulp.dest(vendorDir + 'datatables'));
  // Font Awesome
  var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
    .pipe(gulp.dest(vendorDir));

  // jQuery Easing
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest(vendorDir + 'jquery-easing'));

  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ]).pipe(gulp.dest(vendorDir + 'jquery'));

    // Simple Line Icons
  var sliJs = gulp.src('./node_modules/simple-line-icons/fonts/**')
    .pipe(gulp.dest(vendorDir + '/simple-line-icons/fonts'))

  var sliCss = gulp.src('./node_modules/simple-line-icons/css/**')
    .pipe(gulp.dest(vendorDir + '/simple-line-icons/css'))

  //chartJS, dataTables,
  return merge(popper, bootstrapJS, bootstrapSCSS, bootstrapCSS, fontAwesome, jquery, sliJs, sliCss);
}

// CSS task
function css() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./public/assets/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./public/assets/css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './public/assets/js/*.js',
      '!./public/assets/js/*.min.js',
    ])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./assets/scss/**/*", css);
  gulp.watch(["./public/assets/js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./public/assets/**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
