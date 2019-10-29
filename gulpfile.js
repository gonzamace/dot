const   jshint = require('gulp-jshint'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        csso = require('gulp-csso'),
        browserSync = require('browser-sync').create(),
        gutil = require('gulp-util'),
        gulp = require('gulp');


var css_pattern = ['src/css/*.css'],
	js_pattern = ['src/js/*.js'];

gulp.task('csso', function() {
    return gulp.src(css_pattern)
        .pipe(concat('app.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('scripts',['csso'], function() {
    return gulp.src(js_pattern)
        .pipe(concat('app.min.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('lint',['scripts'], function() {
    return gulp.src(js_pattern,css_pattern)
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('browserSync',['lint'], function() {
    browserSync.init({
    	server:{
    		baseDir:"./"	
    	}  
    })
})

gulp.task('watch',['browserSync'], function() {

    gulp.watch("src/js/*.js", ['scripts']).on('change', browserSync.reload);
    gulp.watch("src/css/*.css", ['csso']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['csso', 'scripts', 'lint', 'browserSync', 'watch']);