const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.root = "/cotown-draft";
  eleventyConfig.outputDir = "sites/cotown-draft";
  baseConfig(eleventyConfig);
  eleventyConfig.addPassthroughCopy({"src/includes/shared/css": eleventyConfig.root + "/assets/css"});   // remove
  eleventyConfig.addPassthroughCopy({"src/includes/vanguard/css": eleventyConfig.root + "/assets/css"}); // remove
  eleventyConfig.addPassthroughCopy({"src/assets/shared": eleventyConfig.root + "/assets"});
  eleventyConfig.addPassthroughCopy({"src/assets/vanguard": eleventyConfig.root + "/assets"});
  eleventyConfig.addGlobalData("root", eleventyConfig.root);
  eleventyConfig.addGlobalData("siteid", 2);
  eleventyConfig.addGlobalData("root", root);
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