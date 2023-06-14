const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  baseConfig(eleventyConfig);
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
      output: "www"
    }
  };
};