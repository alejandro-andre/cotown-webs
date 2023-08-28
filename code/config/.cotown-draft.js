const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.outputDir = "sites/cotown-draft";
  baseConfig(eleventyConfig);
  eleventyConfig.addPassthroughCopy({"src/includes/shared/css": "assets/css"});
  eleventyConfig.addPassthroughCopy({"src/includes/cotown/css": "assets/css"});
  eleventyConfig.addPassthroughCopy({"src/assets/shared": "assets"});
  eleventyConfig.addPassthroughCopy({"src/assets/cotown": "assets"});
  eleventyConfig.addGlobalData("site", "cotown");
  eleventyConfig.addGlobalData("siteid", 2);
  return {
    created: new Date(),
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "includes",
      data: "data",
      output: eleventyConfig.outputDir
    }
  };
};