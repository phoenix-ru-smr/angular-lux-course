var gulp = require('gulp'); // Сообственно Gulp JS
var ts = require('gulp-typescript');

var tsProject = ts.createProject("tsconfig.json");

gulp.task('ts', function(){
  return tsProject.src('app/**/*.ts')
  .pipe(ts(tsProject))
  .pipe(gulp.dest('build/js'));
});

var clean = require('gulp-clean');
gulp.task('clean', function () {
	return gulp.src(['build/**/*.*', 'public/js/app/**/*.*','app/**/*.js'], {read: false})
		.pipe(clean({force: true}));
});

var concat = require('gulp-concat');
gulp.task('default', ["clean","ts"], function(){
  return gulp.src([
      'build/js/**/!(app)*.js',
      'build/js/**/app.js'])
  .pipe(concat("all.js"))
  .pipe(gulp.dest('public/js/app'));
});
