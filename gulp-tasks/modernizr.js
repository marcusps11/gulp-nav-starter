const gulp = require('gulp');
const modernizr = require('modernizr');
const fs = require('fs');

gulp.task('modernizr', () => {
  modernizr.build({
    'options': [
      'html5shiv'
    ],
    'feature-detects': [
      'customevent'
    ]
  }, (result) => {
    fs.writeFileSync('./src/libs/modernizr/modernizr.js', result);
  });
});
