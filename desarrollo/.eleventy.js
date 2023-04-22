const MarkdownIt = require("markdown-it");
const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");
const HtmlMin = require("html-minifier");
const { minify } = require("terser");

module.exports = (eleventyConfig) => {

  // Markdown to HTML
  eleventyConfig.addFilter("markdown", (value) => {
    const md = new MarkdownIt();
    return md.render(value);
  });

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

  // HTML minification
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = HtmlMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });
  
  // Image optimizer
	eleventyConfig.addShortcode("image", async function(src, alt, sizes, name) {
    try {

      // Gety metadata
      let metadata = await Image(src, {
        widths: [300, 600],
        urlPath: "/img/",
        outputDir: "./www/img/",
        filenameFormat: function (id, src, width, format, options) {
          return `${name}-${width}w.${format}`;
        }
      });

      // Image attributes
      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      // Generate HTML
      html = Image.generateHTML(metadata, imageAttributes);
      return html;
    } catch {
      return '<div style="color:red;">[image missing]</div>'
    }
	});

  // Translation
  eleventyConfig.addFilter("translate", function(item, key, lang) {
    if (lang === 'en') {
      return item[key + '_en'] || item[key];
    } else {
      return item[key];
    }
  });
  
  // Copy folders
  eleventyConfig.addPassthroughCopy({"src/assets": "."});

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