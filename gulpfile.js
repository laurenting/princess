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
    .pipe(connect.reload())
})
gulp.task("scss1",function(){
    return gulp.src("./goodsdetail.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("detail.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("scssAll",function(){
    return gulp.src("./*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("data",function(){
    return gulp.src(['*.json','!package.json'])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
})


gulp.task("all",['scss','scssAll','scripts','copy-html','data','images'],function(){
    console.log('全部执行完毕')
})

gulp.task("watch",function(){
    gulp.watch("./indexstyle.scss",["scss"]);
    gulp.watch("./goodsdetail.scss",["scss1"]);
    gulp.watch("./*.scss",["scssAll"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch("*.html",["copy-html"]);
    gulp.watch(['*.json','!package.json'],["data"]);
    gulp.watch("images/**/*",["images"]);
})
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:2333,
        livereload:true
    })
})

//默认启动的任务
gulp.task("default",["watch","server"]);