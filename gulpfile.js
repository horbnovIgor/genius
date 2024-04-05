var gulp = require('gulp'),
	injectPartials  = require('gulp-inject-partials'),
	browserSync 	= require('browser-sync'),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat          = require('gulp-concat'),
	minify          = require('gulp-minify'),
	sass            = require('gulp-sass')(require('sass'));

gulp.task('watch', gulp.series(function (){
	//СОЗДАНИЕ ВИРТУАЛЬНОГО СЕРВЕРА
	browserSync({
		server: {
			baseDir: './build',
			index: "index.html",
			directory: true
		},
		watchTask: true
	});
	//ПОДКЛЮЧЕНИЕ ВНЕШНИХ СТИЛЕЙ
	gulp.src([
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css', // подключение fancybox
	])
		.pipe(concat('libs.min.css'))
		.pipe(gulp.dest('build/css'));
	//ПОДКЛЮЧЕНИЕ ВНЕШНИХ СКРИПТОВ
	gulp.src([
		'node_modules/jquery-validation/dist/jquery.validate.js', // Подключаем jQuery Validation
		'node_modules/slick-carousel/slick/slick.min.js', // Подключаем Slick
		'node_modules/jcf/dist/js/jcf.js', // Подключаем JCF
		'node_modules/jcf/dist/js/jcf.select.js', // Подключаем JCF-SELECT
		'node_modules/jcf/dist/js/jcf.number.js', // Подключаем JCF-NUMBER
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js', // подключение foncybox
		'node_modules/jquery.maskedinput/src/jquery.maskedinput.js', // подключение Маски

	])
		.pipe(concat('libs.js'))
		.pipe(minify({
			ext: {
				min: '.min.js'
			},
			ignoreFiles: ['-min.js']
		}))
		.pipe(gulp.dest('build/js'));

	//ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЙ

	//ИЗМЕНЕНИЕ СТИЛЕЙ
	var css = gulp.watch('./src/scss/**/*.sass');
	css.on('change', function() {
		gulp.src('src/scss/main.sass')
			.pipe(sass())
			.pipe(autoprefixer(['last 2 versions'], {cascade: true}))
			.pipe(gulp.dest('build/css'));

		browserSync.reload();
	});
	//ИЗМЕНЕНИЕ СТРУКТУРЫ
	var html = gulp.watch('./src/templates/**/*.html');
	html.on('change', function() {
		gulp.src('./src/templates/*.html')
			.pipe(injectPartials())
			.pipe(gulp.dest('./build'));

		browserSync.reload();
	});
	//ИЗМЕНЕНИЕ СКРИПТОВ
	var js = gulp.watch('./src/js/*.js');
	js.on('change', function() {
		gulp.src([
			'./src/js/main.js'
		])
			.pipe(gulp.dest('build/js'));
		browserSync.reload();
	})
}));