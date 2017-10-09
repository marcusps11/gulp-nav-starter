const gulp = require('gulp');

gulp.task('assets', () => {
  gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets/'));
});
