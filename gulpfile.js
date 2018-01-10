const gulp = require('gulp');
const webpack = require('webpack-stream');
const less = require('gulp-less');
const config = require('./webpack.config.js');

//转译ts
gulp.task('webpack', () => {
    gulp.src('./src/ts/**/*.ts')
        .pipe(webpack(config, require('webpack')))
        .pipe(gulp.dest('./www/js'));
});

//编译less
gulp.task('less', () => {
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./www/css'));
});

//default
gulp.task('default', ['webpack','less']);

//watch
gulp.task('watch', () => {
    gulp.watch('./src/ts/**/*.ts', ['webpack']);
    gulp.watch('./src/less/*.less', ['less']);
});