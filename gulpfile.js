var gulp = require('gulp')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minifyCss = require('gulp-minify-css')
var plumber = require('gulp-plumber')
var replace = require('gulp-replace')
var webserver = require('gulp-webserver')


/*
 *  ['jade'] ... Compile jade files.
 */

gulp.task('jade', function() {
  gulp.src('./app/jade/**/*.jade')
    .pipe(replace('<SERVER_HOST>', 'localhost'))
    .pipe(replace('<SERVER_PORT>', '9000'))
    .pipe(jade())
    .pipe(gulp.dest('./dist_local/'))
  gulp.src('./app/jade/**/*.jade')
    .pipe(replace('<SERVER_HOST>', '54.197.222.15'))
    .pipe(replace('<SERVER_PORT>', '9000'))
    .pipe(jade())
    .pipe(gulp.dest('./dist_server/'))
})


/*
 *  ['sass'] ... Compile sass files.
 */

gulp.task('sass', function(){
  gulp.src('./app/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer("last 3 version"))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist_local/css/'))
    .pipe(gulp.dest('./dist_server/css/'))
})


/*
 *  ['copy-html'] ... Copy html files.
 */

gulp.task('copy-html', function(){
  gulp.src('./app/html/**/*.html')
    .pipe(gulp.dest('./dist_local/'))
    .pipe(gulp.dest('./dist_server/'))
})


/*
 *  ['copy-js'] ... Copy js files.
 */

gulp.task('copy-js', function(){
  gulp.src('./app/js/**/*.js')
    .pipe(replace('<SERVER_HOST>', 'localhost'))
    .pipe(replace('<SERVER_PORT>', '9000'))
    .pipe(gulp.dest('./dist_local/js/'))
  gulp.src('./app/js/**/*.js')
    .pipe(replace('<SERVER_HOST>', '54.197.222.15'))
    .pipe(replace('<SERVER_PORT>', '9000'))
    .pipe(gulp.dest('./dist_server/js/'))
})


/*
 *  ['copy-api'] ... Copy html files.
 */

gulp.task('copy-api', function(){
  gulp.src('./api/**/*')
    .pipe(replace('<SERVER_HOST>', 'localhost'))
    .pipe(replace('<SERVER_PORT>', '9000'))
    .pipe(gulp.dest('./dist_local/api/'))
  gulp.src('./api/**/*')
    .pipe(replace('<SERVER_HOST>', '54.197.222.15'))
    .pipe(replace('<SERVER_PORT>', '9000'))
    .pipe(gulp.dest('./dist_server/api/'))
})


/*
 *  ['webserver'] ... Make server.
 *
 *  http://localhost:8080
 */

gulp.task('webserver', function () {
  gulp.src('./dist_local/')
    .pipe(webserver({
      host: 'localhost',
      port: 8081,
      livereload: true
    }))
})





/*
 *  ['dev'] ... Develop mode.
 */

gulp.task('dev', ['webserver'], function(){
  gulp.watch('./app/jade/**/*.jade', ['jade'])
  gulp.watch('./app/sass/**/*.scss', ['sass'])
  gulp.watch('./app/html/**/*.html', ['copy-html'])
  gulp.watch('./app/js/**/*.js', ['copy-js'])
})


/*
 *  ['install'] ... Install modules.
 */

gulp.task('install', function () {
  gulp.src('./node_modules/sanitize.css/lib/sanitize.scss')
    .pipe(gulp.dest('./app/sass/lib/'))
//  gulp.src(['./node_modules/bulma/bulma.sass', './node_modules/bulma/bulma/**'], { base: './node_modules/bulma'} )
//    .pipe(gulp.dest('./dev/sass/lib/'))
})
