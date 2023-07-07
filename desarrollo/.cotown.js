const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  baseConfig(eleventyConfig);
  eleventyConfig.addPassthroughCopy({"src/includes/shared/css": "assets/css"}); // remove
  eleventyConfig.addPassthroughCopy({"src/includes/cotown/css": "assets/css"}); // remove
  eleventyConfig.addPassthroughCopy({"src/includes/shared/js": "assets/js"});   // remove
  eleventyConfig.addPassthroughCopy({"src/includes/cotown/js": "assets/js"});   // remove
  eleventyConfig.addPassthroughCopy({"src/assets/shared": "assets"});
  eleventyConfig.addPassthroughCopy({"src/assets/cotown": "assets"});
  eleventyConfig.addPassthroughCopy({"src/icons/cotown": "assets/icons"});
  eleventyConfig.addGlobalData("site", "cotown");
  eleventyConfig.addGlobalData("siteid", 2);
  return {
    created: new Date(),
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "includes",
      data: "data",
      output: "sites/cotown"
    }
  };
};