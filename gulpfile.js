var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var del = require('del');

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  // return del(['js/**/*.min.js']);
});

gulp.task('default', ['watch'])

gulp.task('minify-js', ['clean'], function(){
  gulp.src(['js/*.js','!js/*.min.js']) // 要压缩的js 文件
  .pipe(uglify()) // 使用uglify 进行压缩
  .pipe(rename(function(path){
    path.basename +='.min';
    // path.extname = '.js';
  }))
  .pipe(gulp.dest('js')); // 压缩后的路径
});

gulp.task('jshint',['clean'],function(){
  gulp.src(['js/*.js','!js/*.min.js'])
  .pipe(jshint())
  .pipe(jshint.reporter()); // 输出检测结果
});

gulp.task('watch', ['clean'],function(){
  gulp.watch(['js/*.js','!js/*.min.js'],['minify-js'])
})
