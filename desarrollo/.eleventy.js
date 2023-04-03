const markdownit = require("markdown-it");
const cleancss = require("clean-css");
const Image = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier");
const path = require("path");
const minify = require("terser");
  
module.exports = (eleventyConfig) => {

  // Markdown to HTML
  eleventyConfig.addFilter("markdown", (value) => {
    const md = new markdownit();
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
    return new cleancss({}).minify(code).styles;
  });

  // Image optimizer
	eleventyConfig.addShortcode("image", async function(src, alt, sizes, name) {
		let metadata = await Image(src, {
			widths: [300, 600],
			urlPath: "/img/",
      outputDir: "./www/img/",
      filenameFormat: function (id, src, width, format, options) {
        return `${name}-${width}w.${format}`;
      }
		});
    let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

    html = Image.generateHTML(metadata, imageAttributes);
		return html;
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