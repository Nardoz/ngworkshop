var gulp        = require('gulp'),
    refresh     = require('gulp-livereload'),
    server      = require('tiny-lr')(),
    connect     = require('connect'),
    rewrite     = require('connect-modrewrite'),
    http        = require('http'),
    path        = require('path');

gulp.task('server', function () {
    var port        = 3000,
        hostname    = null,
        base        = path.resolve('src'),
        directory   = path.resolve('src');

    var routes = [
            '^/(s\\d{2}e\\d{2})/$ /$1/index.html',
    ];

    var app = connect()
                .use(rewrite(routes))
                .use(connect.static(base, { hidden: true }))
                .use(connect.directory(directory));

    http.createServer(app).listen(port, hostname);
});

gulp.task('livereload', function() {
    server.listen(35729, function (error) {
        console.log(error || 'Livereload server started');
    });
});

gulp.task('build', function () {
    gulp.src('src')
        .pipe(refresh(server));
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.html', 'src/**/*.js'], ['build']);
});

gulp.task('default', ['livereload', 'server', 'watch']);