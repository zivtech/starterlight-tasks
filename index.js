'use strict';

// Load Gulp and tools we will use.
const gulp          = require('gulp'),
      inject        = require('gulp-inject'),
      gSass          = require('gulp-sass'),
      sassGlob      = require('gulp-sass-glob'),
      sassLint      = require('gulp-sass-lint'),
      postcss       = require('gulp-postcss'),
      mqpacker      = require('css-mqpacker'),
      presetEnv     = require('postcss-preset-env'),
      cssnano       = require('cssnano'),
      eslint        = require('gulp-eslint'),
      browserSync   = require('browser-sync').create(),
      favicons      = require('favicons').stream;

let tasks = {};

// Compile Sass to CSS.
function sass() {
  return gulp.src(global.SLoptions.sass.paths.src, {
      sourcemaps: global.SLoptions.sass.sourcemaps
    })
    .pipe(sassGlob(global.SLoptions.sassGlob))
    .pipe(gSass(global.SLoptions.sass.config)).on('error', gSass.logError)
    .pipe(postcss([
      presetEnv(global.SLoptions.postcss.postcssPresetEnv),
      mqpacker(global.SLoptions.postcss.mqpacker),
      cssnano(global.SLoptions.postcss.cssnano),
    ]))
    .pipe(gulp.dest(global.SLoptions.sass.paths.dest, {
      sourcemaps: global.SLoptions.sass.sourcemaps ? '.' : false
    }))
    .pipe(browserSync.reload({stream: true}));
}
tasks.sass = sass;

// Lint Sass.
function lintSass() {
  return gulp.src(global.SLoptions.sass.paths.src)
    .pipe(sassLint(global.SLoptions.sassLint))
    .pipe(sassLint.format())
}
tasks['lint:sass'] = lintSass;

// Lint JS
function lintJs() {
  return gulp.src(global.SLoptions.js.paths.src)
    .pipe(eslint(global.SLoptions.eslint))
    .pipe(eslint.format())
};
tasks['lint:js'] = lintJs;

// Lint Sass and JavaScript.
tasks.lint = gulp.parallel(lintSass, lintJs);

// Watch for changes to Sass files and rebuild.
function watchCss() {
  gulp.watch(global.SLoptions.sass.paths.src, gulp.series(sass, lintSass));
};
tasks['watch:css'] = watchCss;

// Watch for changes to JS files and lint them.
function watchJs() {
  gulp.watch(global.SLoptions.js.paths.src, gulp.series(lintJs));
};
tasks['watch:js'] = watchJs;

// Initiate BrowserSync server.
function serve() {
  browserSync.init(global.SLoptions.browserSync);
};
tasks.serve = serve;

// Generate favicons.
function faviconsGenerate() {
  return gulp.src(global.SLoptions.favicons.paths.src)
    .pipe(favicons(global.SLoptions.favicons.config))
    .pipe(gulp.dest(global.SLoptions.favicons.paths.dest));
};
tasks['favicons:generate'] = faviconsGenerate;

// Inject favicons into template.
function faviconsInject() {
  return gulp.src(global.SLoptions.favicons.paths.templateDir + global.SLoptions.favicons.paths.templateFile)
    .pipe(inject(gulp.src(global.SLoptions.favicons.paths.dest + global.SLoptions.favicons.config.html), {
      transform: function (filePath, file) {
        return file.contents
          .toString()
          .replace(/device-width/g, 'width')
          .replace(/device-height/g, 'height');
      }
    }))
  .pipe(gulp.dest(global.SLoptions.favicons.paths.templateDir));
};
tasks['favicons:inject'] = faviconsInject;

// Wrapper task for handling favicons.
tasks.favicons = gulp.series(faviconsGenerate, faviconsInject);

// Default watch task.
tasks.watch = gulp.parallel(serve, watchCss, watchJs);

// Build everything (default task)
tasks.build = gulp.series(sass, lintSass, lintJs);
tasks.default = gulp.series(sass, lintSass, lintJs);

exports.tasks = tasks;
