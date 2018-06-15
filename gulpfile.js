'use strict'

const gulp = require('gulp')
const scss = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const htmlMin = require('gulp-htmlmin')
const url = require('url');
const proxy = require('proxy-middleware');
const imagemin = require('gulp-imagemin')
const gutil = require('gulp-util')
const chalk = require('chalk')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const browserify = require('browserify')
const babelify = require('babelify')
const plumber = require('gulp-plumber')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync')
const config = {
  mainStyleFile: './client/styles/main.scss',
  outputStyles: './public/dist/styles',
  entryScriptsPath: '/client/components/',
  entryScripts: ['./client/**/*.jsx', './client/**/*.js'],
  outputScripts: './public/dist/scripts/',
  mainentryScriptFile: './client/main.js',
  entryFonts: './client/fonts/**/*',
  outputFonts: './public/dist/fonts',
  entryImages: './client/images/**/*',
  outputImages: './public/dist/images',
  entryStyles: './client/components/**/*.scss',
  libsStyles: [
    './node_modules/react-simple-dropdown/styles/Dropdown.css'
  ]
}
const paths = {
  src: ['app/**/**/*.js', '!app/scripts/**/*.min.js'],
  dest: 'build/js'
}

function handleError (err) {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('bundleStyles', () => {
  return gulp.src(config.libsStyles)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(sourcemaps.init())
    .pipe(concat('libs.css'))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.outputStyles))
})

gulp.task('styles', () => {
  return gulp.src(config.mainStyleFile)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(autoprefixer({browsers: ''}))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.outputStyles))
})

// mapping errors during browserify work
function mapError (err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.fileName.replace(path.join(__dirname, config.entryScriptsPath), '')) +
      ': ' +
      'Line ' +
      chalk.magenta(err.lineNumber) +
      ' & ' +
      'Column ' +
      chalk.magenta(err.columnNumber || err.column) +
      ': ' +
      chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.message))
  }
  this.emit('end')
}
// bundle js
function bundleJs (bundler) {
  return bundler.bundle()
    .on('error', mapError)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // capture sourcemaps from transforms
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.outputScripts))
}

// scripts
gulp.task('js', () => {
  let bundler = browserify(config.mainentryScriptFile, {debug: true})
    .transform(babelify, {presets: ['es2015']})
  return bundleJs(bundler)
})

gulp.task('fonts', () => {
  return gulp.src(config.entryFonts)
    .pipe(gulp.dest(config.outputFonts))
})

gulp.task('images', () => {
  return gulp.src(config.entryImages)
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.outputImages))
})

gulp.task('browser-sync', function () {
  var proxyOptions = url.parse('http://localhost:3141/api')
  proxyOptions.route = '/api'
  // requests to `/api/x/y/z` are proxied to `http://localhost:3000/secret-api`

  browserSync({
    open: true,
    port: 3000,
    server: {
      baseDir: "./public",
      middleware: [proxy(proxyOptions)]
    }
  })
})

gulp.task('watch', () => {
  gulp.watch(paths.es6, ['eslint', 'commonjs'])
  runSequence(
    ['images'],
    ['bundleStyles'],
    ['styles', 'js'],
    'browserSync',
    () => {
      gulp.watch(config.entryScripts, event => {
        gutil.log(chalk.magenta('File ' + event.path + ' was ' + event.type))
        gulp.start('js')
      })
      gulp.watch(config.mainentryScriptFile, event => {
        gutil.log(chalk.magenta('File ' + event.path + ' was ' + event.type))
        gulp.start('js')
      })
      gulp.watch(config.entryStyles, event => {
        gutil.log(chalk.magenta('File ' + event.path + ' was ' + event.type))
        gulp.start('styles')
      })
      // gulp.watch(config.entryTemplates, event => {
      //   gutil.log(chalk.magenta('File ' + event.path + ' was ' + event.type))
      //   gulp.start('templates')
      // })
      gulp.watch(config.entryImages, ['images'])
      gulp.watch(config.entryFonts, ['fonts'])
    }
  )
  // gulp.watch(config.entryStyles, ['styles'])
  // gulp.watch(config.entryScripts, ['js'])
  // gulp.watch(config.entryHtml, ['html'])
  // gulp.watch(config.entryImages, ['images'])
  // gulp.watch(config.entryTemplates, ['templates'])
  // gulp.watch(config.entryFonts, ['fonts'])
  // gulp.watch(config.entrySamples, ['samples'])
  // gulp.watch(config.entryFavicon, ['favicon'])
})

gulp.task('default', ['styles', 'js', 'images', 'browser-sync'], () => {

})

gulp.task('babel', function () {
  return gulp.src(paths.es6)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.temp))
})

gulp.task('commonjs', ['babel'], function () {
  return browserify(paths.temp + 'app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.scripts))
})

gulp.task('eslint', function () {
  return gulp.src(paths.es6)
    .pipe(eslint({
      'extends': '.eslintrc',
      'globals': {
        'angular': true
      }
    }))
    .pipe(eslint.format())
})

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './public'
    },
    port: 2718,
    open: true,
    notify: false
  })
})
