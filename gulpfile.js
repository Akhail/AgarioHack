var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    iife = require('gulp-iife'),
    gutil = require('gulp-util');

gulp.task('js', function(){
    gulp.src('src/js/*.js')
        .pipe(concat('client.min.js'))
        .pipe(iife())
        .pipe(jshint({
            'esversion': 6
        }))
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/'))
});

gulp.task('css', function(){
    gulp.src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', function(){
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/scss/*.scss', ['css']);
});