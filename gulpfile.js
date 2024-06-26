const { src, dest, watch, parallel, series } = require("gulp");

const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const clean = require("gulp-clean");
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const htmlmin = require("gulp-htmlmin");
const include = require("gulp-include");

function pages() {
  return src("src/pages/*.html")
    .pipe(
      include({
        includePaths: "src/components",
      })
    )
    .pipe(dest("src"));
}

function htmlCompress() {
  return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"));
}

function fonts() {
  return src("src/fonts/src-fonts/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("src/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("src/fonts"));
}

function images() {
  return src(["src/img/src-img/*.*", "!src/img/src-img/*.svg"])
    .pipe(newer("src/img"))
    .pipe(avif({ quality: 50 }))

    .pipe(src("src/img/src-img/*.*"))
    .pipe(newer("src/img"))
    .pipe(webp())

    .pipe(src("src/img/src-img/*.*"))
    .pipe(newer("src/img"))
    .pipe(imagemin())

    .pipe(dest("src/img"));
}

function icons() {
  return src(["src/icons/src-icons/*.*"])
    .pipe(newer("src/icons"))
    .pipe(imagemin())

    .pipe(dest("src/icons"));
}

function scripts() {
  return src("src/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"));
}

function watching() {
  watch(["src/fonts/src-fonts"], fonts);
  watch(["src/img/src-img"], images);
  watch(["src/icons/src-icons"], icons);
  watch(["src/js/main.js"], scripts);
  watch(["src/components/*", "src/pages/*"], pages);
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    [
      "src/css/*.css",
      "src/img/*.*",
      "src/icons/*.*",
      "src/fonts/*.*",
      "src/js/*.js",
      "!src/js/main.js",
    ],
    {
      base: "src",
    }
  ).pipe(dest("dist"));
}

exports.pages = pages;
exports.htmlCompress = htmlCompress;
exports.images = images;
exports.icons = icons;
exports.fonts = fonts;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building, htmlCompress);
exports.default = parallel(scripts, pages, watching);
