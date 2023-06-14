const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  baseConfig(eleventyConfig);
  eleventyConfig.addGlobalData("site", "cotown");
  eleventyConfig.addPassthroughCopy({"src/assets/cotown": "assets"});
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