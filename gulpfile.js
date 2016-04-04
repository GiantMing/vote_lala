var gulp = require("gulp"),
	path = require("path"),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;


// 监听文件改动
gulp.task("default", function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("view/home/*.html").on("change", reload);
	gulp.watch("www/vote_lala/static/css/*.css").on("change", reload);
	gulp.watch("www/vote_lala/static/img/*.jpg").on("change", reload);
	gulp.watch("www/vote_lala/static/img/*.png").on("change", reload);
});
