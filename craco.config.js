const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    { plugin: require('@semantic-ui-react/craco-less') },
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.extend.json"
      }
    }
  ]
};
