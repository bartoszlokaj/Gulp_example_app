const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

/*
  --TOP LEVEL FUNCTIONS--
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Point to folder to output (build)
  gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function(done) {
  console.log("HTTP Server Started");
  done();
});

// Copy all HTML files
gulp.task('copyHtml', function(done) {
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
  done();
});

// Optimize images (imagemin plugin required)
gulp.task('imagemin', ()=>
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

// Minify JS
gulp.task('minify', function(done){
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
  done();
});

// Compile Sass
gulp.task('sass', function(done){
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'));
  done();
});

// Scripts
gulp.task('scripts', function(done) {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    done();
});

// Default
gulp.task('default', gulp.series('copyHtml','imagemin','sass','scripts'));

gulp.task('stream', function() {
  return watch('src/*.html', { ignoreInitial: false })
    .pipe(gulp.dest('dist'));
});