'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var deporder = require('gulp-deporder');

sass.compiler = require('sass');
const { watch, series } = require('gulp');

var sassDest = 'scss/';
var cssDest = 'css/';
var sassSrc = [sassDest +'**/*.s+(a|c)ss'];
var sassMain = sassDest +'style.scss';

function scssTask() {
  return gulp.src( sassMain )
    .pipe( sassGlob() )
    .pipe( sourcemaps.init() )
    .pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
    .pipe( autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false }) )
    .pipe( sourcemaps.write('./sourcemaps') )
    .pipe( gulp.dest(cssDest) );
}

function scripts() {
  return gulp.src('./js/*.js')
  .pipe(deporder())
  .pipe(sourcemaps.init())
  //.pipe(
  //	babel({
  //		presets: ['env'],
  //	}),
  //)
  .pipe(concat('main.min.js'))
  // .pipe(
  //   uglify().on('error', function(err) {
  //     console.log(err);
  //   }),
  // )
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./js'));
}

function watchTask(){
    gulp.watch(sassSrc, scssTask);
    gulp.watch('src/scripts/**/*', scripts);
}

exports.default = function() {
  watch(sassSrc, { ignoreInitial: false }, series(scssTask, scripts, watchTask));
};