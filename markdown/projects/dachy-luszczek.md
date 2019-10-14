---
title: Strona DachyLuszczek.pl
description: Strona firmy "Działalność Ogólnobudowlana Mariusz Łuszczek". Prosta strona napisana w Vanilla JS oraz zbudowana i zoptymalizowana przy pomocy webpacka.
ctime: 2019-06-26
url: https://dachyluszczek.pl
git:
img: /projects_img/dachy-luszczek.png
tech: JavaScript,SASS,HTML5,webpack,php
---

# Strona dla brata

Strona dachyluszczek.pl powstała na prośbę mojego młodszego brata. 'Ty się na tym znasz to moze byś zrobił...'. No i w taki sposób zaczął się projekt napisania prostej, niewymagającej dużo pracy strony, która będzie wyglądać dobrze i nowoczesnie. Jako, ze projekt miał nie tylko dobrze wyglądać ale i zapewnic mi odpowiedni trening, wybranie technologi było kluczowe. Padło na Vanilla JS i webpack do zbandlowania wszystkiego. Stylowanie w Scss, bo jakos bardziej naturalnie mi sie w nim pisze niz w czystym css'ie.

---

<!-- ## Aplikacja korzysta z:
<div class="md_icons_wrapper">
<img src="/icons/HTML5.png" "HTML5" class="md_icon">
<img src="/icons/SASS.png" "Scss" class="md_icon">
<img src="/icons/JavaScript.png" "JavaScript" class="md_icon">
<img src="/icons/webpack.png" "Webpack" class="md_icon">
<img src="/icons/php.png" "PHP" class="md_icon">
</div> -->

---

Celem dla mnie stało sie aby strona była przejrzysta i prosta w swojej budowie. JavaScript bez bibliotek czy frameworków (bo w sumie jak zaczynałem, to jeszcze żadnego nie znałem) miał pomóc opanować lepiej język i zmusic do pokombinowania. Muszę przyznać, że pisanie prostych galerii, menu typu hamburger itp dało sporo początkujacemu programiscie. W przyszłosci, jak czas pozwoli chciałbym popracować nad gelerią, może spróbować ją zrobić w Stencilu jako webcomponent, żeby przybliżyć sobie ten temat.

Webpack i SCSS pomogły utrzymać porządek w aplikacji i konsekwencje. Udało mi się też dzięki temu napisać [proste boilerplate repo z gotowym, skonfigurowanym webpackiem](https://github.com/sebastianluszczek/webpack_config_boilerplate) (Scss, przebudowywanie html, bundlowanie JS i przenoszenie grafik, załączanie favicon'u).

```javascript
// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const extractPlugin = new ExtractTextPlugin({
  filename: "main.css"
});

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  watch: true,
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead"
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: extractPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "resolve-url-loader",
            "postcss-loader",
            "sass-loader"
          ]
        })
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/"
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "./fonts/[name].[ext]",
            publicPath: "../"
          }
        }
      }
    ]
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      favicon: "src/favicon.ico"
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};
```

O webpacku i jego prostej konfiguracji (o ile jest coś takiego jak prosta konfiguracja) powstanie jeden z pierwszych wpisów na blogu. Rzecz wart odświeżenia!
