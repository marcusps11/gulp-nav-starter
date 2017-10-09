'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const history = require('connect-history-api-fallback');

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    port: 9111,
    livereload: true,
    middleware: (connect, opt) => {
      return [ history({}) ];
    }
  });
});
