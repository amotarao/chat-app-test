var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');


/*
 *  ['jade'] ... Compile jade files.
 */

gulp.task('jade', function() {
  gulp.src('./app/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
});


/*
 *  ['sass'] ... Compile sass files.
 */

gulp.task('sass', function(){
  gulp.src('./app/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer("last 3 version"))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css/'));
});


/*
 *  ['copy-html'] ... Copy html files.
 */

gulp.task('copy-html', function(){
  gulp.src('./app/html/**/*.html')
    .pipe(gulp.dest('./dist/'));
});


/*
 *  ['webserver'] ... Make server.
 *
 *  http://localhost:8080
 */

gulp.task('webserver', function () {
  gulp.src('./dist/')
    .pipe(webserver({
      host: 'localhost',
      port: 9000,
      livereload: true
    }));
});





/*
 *  ['dev'] ... Develop mode.
 */

gulp.task('dev', ['webserver'], function(){
  gulp.watch('./app/jade/**/*.jade', ['jade']);
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/html/**/*.html', ['copy-html']);
});


/*
 *  ['install'] ... Install modules.
 */

gulp.task('install', function () {
  gulp.src('./node_modules/sanitize.css/lib/sanitize.scss')
    .pipe(gulp.dest('./app/sass/lib/'));
//  gulp.src(['./node_modules/bulma/bulma.sass', './node_modules/bulma/bulma/**'], { base: './node_modules/bulma'} )
//    .pipe(gulp.dest('./dev/sass/lib/'));
});
