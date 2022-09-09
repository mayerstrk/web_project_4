// postcss.config.js

// connect plugins to file
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  //connect plugin to Post CSS
  plugins: [
    autoprefixer,
    //pass an object with options upon connecting cssnano:
    cssnano({ preset: "default" }) // set default minification settings
  ]
};