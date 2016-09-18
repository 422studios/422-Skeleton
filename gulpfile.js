var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var order = require('gulp-order');
var notify = require('gulp-notify');

// Gulp task for sass
gulp.task('sass', function () {
  gulp.src('components/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify("Gulp build successful!"));
});

// Gulp uglify task
gulp.task('compress', function() {
  return gulp.src('components/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Uglify Plugins
// Here you want to concatenate and minify all the scripts that you have
// downloaded with bower. You need to manually set these up so they are in
// the correct order and you don't get any javascript errors!

//Lets create an array that has all our bower JS plugins...
var allPlugins = [
  'components/libs/jquery/dist/jquery.js',
  'components/libs/bootstrap/dist/js/bootstrap.js'
];

gulp.task('uglifyPlugins', function() {
  return gulp.src(allPlugins)
    .pipe(order(allPlugins, { base: './' }))
    .pipe(concat('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify Plugins CSS
// Here you want to concatenate and minify all the css files that you have
// downloaded with bower.

//Lets create an array that has all our bower css files...
var allStyles = [
  'components/libs/bootstrap/dist/css/bootstrap.css'
]
gulp.task('minifyPlugins', function() {
  return gulp.src(allStyles)
    .pipe(order(allPlugins))
    .pipe(concat('plugins.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// Runs both tasks at once
gulp.task('build', ['uglifyPlugins', 'minifyPlugins', 'compress', 'sass']);

// Watching files
gulp.task('watch', function() {
  gulp.watch("components/js/*.js", ['build']);
  gulp.watch("components/scss/**/*.scss", ['build']);
});

// Run these tasks as default
gulp.task('default', ['watch']);
