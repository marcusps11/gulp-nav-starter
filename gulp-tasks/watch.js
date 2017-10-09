'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const watch = require('gulp-watch');
const source = require('vinyl-source-stream');
const scsslint = require('gulp-scss-lint');
const babelify = require('babelify');
const browserify = require('browserify');
const sass = require('gulp-sass');

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.scss', ['scss-lint', 'scss']);
  gulp.watch('src/**/*.hbs', ['hbs']);
});

gulp.task('js', () => {
  const bundler = browserify('src/scripts/main.js', {
    debug: true
  });

  const output = bundler.transform(babelify, {
    presets: [ 'es2015', 'es2015-loose' ]
  }).bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(connect.reload());
});

gulp.task('scss', () => {
  let pathsArray = require('node-bourbon').includePaths;
  const bootstrapPath = './node_modules/bootstrap-sass/assets/stylesheets';

  pathsArray.push(bootstrapPath);

  return gulp
    .src('./src/styles/main.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({
      includePaths: pathsArray
    })
    .on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(connect.reload());
});

gulp.task('scss-lint', function() {
  return gulp
    .src('src/**/*.scss')
    .pipe(scsslint());
});

gulp.task('hbs', [ 'components', 'templates', 'standalone-components', 'index' ]);
