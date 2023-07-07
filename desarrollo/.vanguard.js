const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.outputDir = "sites/vanguard";
  baseConfig(eleventyConfig);
  eleventyConfig.addPassthroughCopy({"src/includes/shared/css": "assets/css"});   // remove
  eleventyConfig.addPassthroughCopy({"src/includes/vanguard/css": "assets/css"}); // remove
  eleventyConfig.addPassthroughCopy({"src/includes/shared/js": "assets/js"});     // remove
  eleventyConfig.addPassthroughCopy({"src/includes/vanguard/js": "assets/js"});   // remove
  eleventyConfig.addPassthroughCopy({"src/icons/vanguard": "assets/icons"});      // remove
  eleventyConfig.addPassthroughCopy({"src/assets/shared": "assets"});
  eleventyConfig.addPassthroughCopy({"src/assets/vanguard": "assets"});
  eleventyConfig.addGlobalData("site", "vanguard");
  eleventyConfig.addGlobalData("siteid", 1);
  return {
    created: new Date(),
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "includes",
      data: "data",
      output: "sites/vanguard"
    }
  };
};