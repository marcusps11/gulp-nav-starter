'use strict';

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('minify-css', ['scss'], () => {
  return gulp.src(['./dist/styles/*.css', '!./dist/styles/*.min.css'])
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('minify-js', [], () => {
  return pump([
    gulp.src(['./dist/scripts/*.js', '!./dist/scripts/*.min.js']),
    rename({ suffix: '.min' }),
    uglify(),
    gulp.dest('./dist/scripts')
  ]);
});
