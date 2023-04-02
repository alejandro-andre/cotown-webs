const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const { minify } = require("terser");
  
module.exports = (eleventyConfig) => {

  // Text to URL
  eleventyConfig.addFilter('ascii', (value) => {
    if (value != null)
      return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/\s/g, '-')
        .replace(/,/g, '')
        .replace(/[\u0300-\u036f]/g, '');
    return null;
  });
  
  // HTML minification
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    return content;
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
  
  // JS minification
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      callback(null, code);
    }
  });
  
  // CSS minification
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Custom order
  eleventyConfig.addFilter("sort", function(values, field) {
    return values.slice().sort((a, b) => a[field].localeCompare(b[field]))
  });

  
  // Copy folders
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/icons");

  // Config
  return {
    created: new Date(),
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "includes",
      data: "data",
      output: "www"
    }

  };

};