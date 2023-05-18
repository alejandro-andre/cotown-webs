const MarkdownIt = require("markdown-it");
const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");
const HtmlMin = require("html-minifier");
const { minify } = require("terser");

module.exports = (eleventyConfig) => {

  // Clean up filter
  eleventyConfig.addFilter("cleanup", function(text) {
    return text.replace(/[\x00-\x1F]/g, " ").replace("  ", " ");
  });
  
  // Translation filter
  eleventyConfig.addFilter("translate", function(item, key, lang) {
    if (lang === 'en') {
      return item[key + '_en'] || item[key];
    } else {
      return item[key];
    }
  });
  
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
  
  // CSS minification
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
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

  // Literals shortcode
	eleventyConfig.addShortcode("literal", async function(literals, id, lang) {
    try {
      return literals[id][lang];
    } catch {
      return `<span style="color:red;">[text missing ${lang}: ${id}]</span>`
    }
  });

  // Image optimizer shorcode
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
      return `<span style="color:red;">[image missing ${name}]</span>`;
    }
	});

  // Copy folders
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});

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