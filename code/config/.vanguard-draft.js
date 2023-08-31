const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.outputDir = "sites/vanguard-draft";
  baseConfig(eleventyConfig);
  eleventyConfig.addPassthroughCopy({"src/includes/shared/css": "assets/css"});   // remove
  eleventyConfig.addPassthroughCopy({"src/includes/vanguard/css": "assets/css"}); // remove
  eleventyConfig.addPassthroughCopy({"src/assets/shared": "assets"});
  eleventyConfig.addPassthroughCopy({"src/assets/vanguard": "assets"});
  eleventyConfig.addGlobalData("site", "vanguard");
  eleventyConfig.addGlobalData("siteid", 1);
  eleventyConfig.addGlobalData("root", "/");
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