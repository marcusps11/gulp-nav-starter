'use strict';

const Handlebars = require('handlebars');
const gulp = require('gulp');
const path = require('path');
const glob = require('glob');
const fsExtra = require('fs-extra');
const Q = require('q');
const data = require('gulp-data');
const rename = require('gulp-rename');
const handlebars = require('gulp-compile-handlebars');
const layouts = require('handlebars-layouts');
const fs = require('fs');
const notify = require('gulp-notify');

handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));

handlebars.Handlebars.registerHelper('xif', (v1, v2, options) => {
  if (v1 === v2) {
    return options.fn(this);
  }

  return options.inverse(this);
});

gulp.task('index', () => {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('components', () => {
  return gulp
    .src('./src/components/**/*.hbs')
    .pipe(data((file) => {
      const relative = path.relative(__dirname, file.path).replace(/.hbs/, '.json');
      const filePath = path.resolve(__dirname, relative);

      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }))
    .pipe(handlebars(data, {
      batch: [ './src/components', './src/layouts' ]
    }))
    .on('error', handleErrors)
    .pipe(rename((filePath) => {
      filePath.extname = '.html';
    }))
    .pipe(gulp.dest('./dist/components/'));
});

gulp.task('templates', () => {
  return gulp.src('./src/pages/**/*.hbs')
    .pipe(data((file) => {
      const relative = path.relative(__dirname, file.path).replace(/.hbs/, '.json');
      const filePath = path.resolve(__dirname, relative);

      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }))
    .pipe(handlebars(data, {
      batch: [ './src/components', './src/layouts' ]
    }))
    .on('error', handleErrors)
    .pipe(rename((filePath) => {
      filePath.extname = '.html';
    }))
    .pipe(gulp.dest('./dist/pages/'));
});

gulp.task('standalone-components', ['components'], () => {
  const isNotStandalone = /standalone/i
  let sources = glob
    .sync('./dist/components/**/*.html')
    .filter((file) => (!isNotStandalone.test(file)));

  generateStandaloneTemplates(sources).then(() => {
    return gulp
      .src('./dist/components/**/*.hbs')
      .pipe(handlebars({
          title: "single component"
        }, {
          batch: [ './src/components', './src/layouts' ]
        }
      ))
      .on('error', handleErrors)
      .pipe(rename((filePath) => {
        filePath.extname = '.html';
      }))
      .pipe(gulp.dest('./dist/components/'));
  });
});

function generateStandaloneTemplates(sources) {
  const queuedPromises = [];

  sources = sources.map((src) => path.resolve(src));
  sources.forEach((source) => {
    const defer = Q.defer();
    const template = fs.readFileSync(source, 'utf8');
    const folderPath = source.substring(0, source.lastIndexOf('/')) + '/';
    let componentName = source.slice(source.lastIndexOf('/')).replace(/\//, '')
    componentName = componentName.replace('.html', '');

    fs.stat(`${folderPath}standalone`, (err, stats) => {
      if (err) {
        fs.mkdirSync(`${folderPath}standalone`);
      }

      fs.readFile('./bootstrapping/componentBase/template.hbs', 'utf8', (err, data) => {
        let mutatedData = data.replace(/<%component%>/, template);

        fs.writeFileSync(`${folderPath}standalone/${componentName}.hbs`, mutatedData);
        defer.resolve();
      });
    });

    queuedPromises.push(defer.promise);
  });

  return Q.all(queuedPromises);
}

function handleErrors() {
  const args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
  }).apply(this, args);

  this.emit('end');
}
