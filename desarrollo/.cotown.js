const baseConfig = require('./.base.js');

module.exports = function (eleventyConfig) {
  baseConfig(eleventyConfig);
  eleventyConfig.addGlobalData("site", "cotown");
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