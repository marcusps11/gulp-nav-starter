const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const glob = require('glob');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const clean = require('gulp-clean');

gulp.task('prepare-spec', () => {
  const inputs = glob.sync('./src/components/**/*-spec.js');

  return browserify({
    entries: inputs,
    debug: true
  })
  .on('error', (err) => {
    console.log(err);
  })
  .transform(babelify, {
    presets: [ 'es2015', 'es2015-loose' ]
  })
  .bundle()
  .pipe(source('specs.js'))
  .pipe(gulp.dest('./tests/'))
  .on('end', function() {
    gulp.start('run-spec');
  });
});

gulp.task('run-spec', () => {
  gulp
    .src('tests/specs.js')
    .pipe(jasmine());
});

gulp.task('clear-spec', () => {
  console.log('finished, clean...');
  return gulp
    .src('./tests', {
      read: false
    })
    .pipe(clean());
});
