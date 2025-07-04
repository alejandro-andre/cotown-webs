const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.root = "";
  eleventyConfig.outputDir = "sites/cotown-publish";
  baseConfig(eleventyConfig);
  eleventyConfig.addPassthroughCopy({"src/includes/shared/css": eleventyConfig.root + "/assets/css"}); // remove
  eleventyConfig.addPassthroughCopy({"src/includes/cotown/css": eleventyConfig.root + "/assets/css"}); // remove
  eleventyConfig.addPassthroughCopy({"src/assets/shared": eleventyConfig.root + "/assets"});
  eleventyConfig.addPassthroughCopy({"src/assets/cotown": eleventyConfig.root + "/assets"});
  eleventyConfig.addGlobalData("root", eleventyConfig.root);
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