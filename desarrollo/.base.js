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
  
  // Markdown to HTML filter
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

  // Text to URL filter
  eleventyConfig.addFilter('ascii', (value) => {
    if (value != null)
      return slugify(value);
    return null;
  });
  
  // Text to date
  eleventyConfig.addFilter('dmy', (value) => {
    if (value != null) {
      var parts = value.split('-');
      return parts[2] + '/' + parts[1] + '/' + parts[0];
    }
    return null;
  });
  
  // CSS minification filter
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Includes
  eleventyConfig.addFilter('includes', function(id, array, tag) {
    if (id === 0) {
      return true;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i][tag].id === id) {
        return true;
      }
    }
    return false;
  });
  
  // JS minification filter
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
      console.log(`Missing text (${lang}) [${id}]`);
      return `<span style="color:red;">[text missing ${lang}: ${id}]</span>`
    }
  });

  // SVG inline shortcode
  eleventyConfig.addNunjucksAsyncShortcode('svg', async (src, alt, name, cls, sizes) => {
    // Get metadata
    console.log(`Retrieving svg ${name}`);
    try {
      let metadata = await Image(src, {
        formats: ['svg'],
        dryRun: true,
      });
      return metadata.svg[0].buffer.toString();
    } catch {
      return '';
    }
  })  

  // Image optimizer shorcode
	eleventyConfig.addShortcode("image", async (src, alt, name, cls, widths, sizes) => {
    try {
      // Get metadata
      console.log(`Retrieving image ${name}`);
      let metadata = await Image(src, {
        widths: widths,
        formats: ["webp", "jpeg"],
        urlPath: "/img/",
        outputDir: "./www/img/",
        cacheOptions: { removeUrlQueryParams: true },
        filenameFormat: function (id, src, width, format, options) {
          return `${slugify(name)}-${width}.${format}`;
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
    } catch (error) {
      console.log(error);
      console.log(`Mising image ${name} ${src}]`);
      return `<span style="color:red;">[image missing ${name}]</span>`;
    }
	});
};