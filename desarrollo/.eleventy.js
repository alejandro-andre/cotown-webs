const MarkdownIt = require('markdown-it');
const MarkdownItAttrs = require('markdown-it-attrs');
const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");
const HtmlMin = require("html-minifier");
const { minify } = require("terser");

module.exports = (eleventyConfig) => {

  // String to slug
  function slugify(str) {
    str = str.toLowerCase();
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Acentos
    str = str.replace(/[^a-z0-9\s-]/g, ''); // Reemplaza caracteres no alfanuméricos por guiones
    str = str.replace(/\s+/g, '-'); // Reemplaza espacios en blanco por guiones
    str = str.replace(/-{2,}/g, '-'); // Elimina guiones consecutivos
    str = str.replace(/^-+|-+$/g, ''); // Elimina guiones al comienzo y al final
    return str;
  }
  
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
    let options = {
      html: true,
      breaks: true,
      linkify: true
    };
    const md = new MarkdownIt(options);
    md.use(MarkdownItAttrs);
    return md.render(value);
  });

  // Text to URL
  eleventyConfig.addFilter('ascii', (value) => {
    if (value != null)
      return slugify(value);
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
    return content;
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
	eleventyConfig.addShortcode("literal", async function(literals, id, lang, md) {
    try {
      if (md) {
        let options = {
          html: true,
          breaks: true,
          linkify: true
        };    
        const md = new MarkdownIt(options);
        md.use(MarkdownItAttrs);
        return md.render(literals[id][lang]);
      } else {
        return literals[id][lang];
      }
    } catch {
      console.log(`Mising text (${lang}) ${id}]`);
      return `<span style="color:red;">[text missing ${lang}: ${id}]</span>`
    }
  });

  // Image optimizer shorcode
	eleventyConfig.addShortcode("image", async (src, alt, name, cls, widths, sizes) => {
    try {
      // Get metadata
      let metadata = await Image(src, {
        widths: widths,
        formats: ["webp", "jpeg"],
        urlPath: "/img/",
        outputDir: "./www/img/",
        filenameFormat: function (id, src, width, format, options) {
          return `${slugify(alt)}-${width}.${format}`;
        }
      });

      // Image attributes
      let imageAttributes = {
        alt,
        sizes,
        class: cls,
        loading: "lazy",
        decoding: "async"
      };

      // Generate HTML
      html = Image.generateHTML(metadata, imageAttributes);
      return html.replace("height", "h");
    } catch {
      console.log(`Mising image ${name} ${src}]`);
      return `<span style="color:red;">[image missing ${name}]</span>`;
    }
	});

  // Copy folders
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});

  // REMOVE !!!
  eleventyConfig.addPassthroughCopy({"src/includes/css": "assets/css"});
  eleventyConfig.addPassthroughCopy({"src/includes/js": "assets/js"});

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