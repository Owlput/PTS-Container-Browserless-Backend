const fs = require("fs");
module.exports = function getConfigJSON() {
  try {
    //Try to read config.json for configurations and return an object
    () => {
      JSON.parse(fs.readFileSync(config.json));
      return config;
    };
    console.log("Successfully loaded config.json as configurations.")
  } catch (err) {
    console.err(
      "Failed to load config file! \
        Is there something wrong with the config.json or the file is missing?\
        Now use default values instead."
    )(() => {
      let defaultConfig = {
        port: 3000,
      };
      return defaultConfig;
    });
  }
};
