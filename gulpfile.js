var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    cssmin  = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    prefix  = require('gulp-autoprefixer'),
    size    = require('gulp-size'),

    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),

    rework      = require('gulp-rework'),
    reworkVars  = require('rework-vars'),
    reworkMedia = require('rework-custom-media'),
    reworkNPM   = require('rework-npm')

gulp.task('rework', function() {
  return gulp.src('css/src/all.css')
    .pipe(rework(reworkNPM(), reworkVars(), reworkMedia()))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix())
    .pipe(rename('c.css'))
    .pipe(gulp.dest('css'))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
})

gulp.task('csslint', ['rework'], function() {
  gulp.src('css/c.css')
    .pipe(csslint({
      'compatible-vendor-prefixes': false,
      'unique-headings': false,
      'box-sizing': false,
      'font-sizes': false,
      'known-properties': false,
      'box-model': false,
      'fallback-colors': false
    }))
    .pipe(csslint.reporter())
})

gulp.task('browserify', function() {
  return browserify({
    entries: './js/src/all.js'
  })
  .transform('brfs')
  .bundle()
  .pipe(source('all.js'))
  .pipe(rename('j.js'))
  .pipe(gulp.dest('js'))
})

gulp.task('js', ['browserify'], function() {
  return gulp.src('js/j.js')
    .pipe(gulp.dest('js'))
})

gulp.task('watch', function() {
  gulp.watch('css/src/*.css', ['rework', 'csslint'])
  gulp.watch('js/src/*.js', ['browserify', 'js'])
})

gulp.task('default', ['rework', 'csslint', 'browserify', 'js', 'watch'])
