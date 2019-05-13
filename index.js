'use strict';

// Load Gulp and tools we will use.
const gulp          = require('gulp'),
      inject        = require('gulp-inject'),
      sass          = require('gulp-sass'),
      sassGlob      = require('gulp-sass-glob'),
      sassLint      = require('gulp-sass-lint'),
      postcss       = require('gulp-postcss'),
      mqpacker      = require('css-mqpacker'),
      presetEnv     = require('postcss-preset-env'),
      cssnano       = require('cssnano'),
      browserSync   = require('browser-sync').create(),
      favicons      = require('favicons').stream;

let tasks = {};

exports.tasks = tasks;

// Build CSS for development environment.
gulp.task('sass', function () {
  return gulp.src(paths.styles.src, {
      sourcemaps: options.sourcemaps
    })
    .pipe(sassGlob())
    .pipe(sass(options.sass)).on('error', sass.logError)
    .pipe(postcss([
      presetEnv(options.postcss.postcssPresetEnv),
      mqpacker(options.postcss.mqpacker),
      cssnano(options.postcss.cssnano),
    ]))
    .pipe(gulp.dest(paths.styles.dest, {
      sourcemaps: options.sourcemaps ? '.' : false
    }))
    .pipe(browserSync.reload({stream: true}));
});

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(paths.styles.src)
    .pipe(sassLint(options.sassLint))
    .pipe(sassLint.format())
});

// Lint Sass and JavaScript.
// @todo needs to add a javascript lint task.
gulp.task('lint', gulp.series('lint:sass'));

// Build everything.
gulp.task('build', gulp.series('sass', 'lint'));

// Watch for changes for scss files and rebuild.
gulp.task('watch:css', function () {
  gulp.watch(paths.styles.src, gulp.series('sass', 'lint:sass'));
});

// Initiate BrowserSync server.
gulp.task('serve', function() {
  browserSync.init(options.browserSync);
});

// Generate favicons.
gulp.task('favicons:generate', function () {
  return gulp.src(options.favicons.source)
    .pipe(favicons(options.favicons.config))
    .pipe(gulp.dest(options.favicons.imgDir));
});

// Inject favicons into template.
gulp.task('favicons:inject', function() {
  return gulp.src('./templates/layout/html.html.twig')
    .pipe(inject(gulp.src(options.favicons.imgDir + options.favicons.config.html), {
      transform: function (filePath, file) {
        return file.contents.toString();
      }
    }))
  .pipe(gulp.dest('./templates/layout'));
});

// Wrapper task for handling favicons.
gulp.task('favicons', gulp.series('favicons:generate', 'favicons:inject'));

// Default watch task.
// @todo needs to add a javascript watch task.
gulp.task('watch', gulp.parallel('serve', 'watch:css'));

// The default task.
gulp.task('default', gulp.series('build'));
