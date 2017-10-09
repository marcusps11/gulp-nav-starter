'use strict';

const gulp = require('gulp');

require('./gulp-tasks/liveReload');
require('./gulp-tasks/watch');
require('./gulp-tasks/handlebars');
require('./gulp-tasks/assets');
require('./gulp-tasks/tests');
require('./gulp-tasks/modernizr');
require('./gulp-tasks/minify');

gulp.task('default', [
  'watch',
  'components',
  'assets',
  'connect'
]);

gulp.task('tests', [
  'prepare-spec'
]);

gulp.task('build', [
  'modernizr',
  'hbs',
  'minify-css',
  'js',
  'minify-js',
  'assets'
]);
