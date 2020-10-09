const gulp = require("gulp");
const scss = require('gulp-sass');
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("scss",function(){
    return gulp.src("./indexstyle.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
})
gulp.task("scssAll",function(){
    return gulp.src("./*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
})

gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
})

gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("data",function(){
    return gulp.src(['*.json','!package.json'])
    .pipe(gulp.dest("dist/data"))
})
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
})


gulp.task("all",['scss','scssAll','scripts','copy-html','data','images'],function(){
    console.log('全部执行完毕')
})

gulp.task("watch",function(){
    gulp.watch("./indexstyle.scss",["scss"]);
    gulp.watch("./*.scss",["scssAll"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch("*.html",["copy-html"]);
    gulp.watch(['*.json','!package.json'],["data"]);
    gulp.watch("images/**/*",["images"]);
})