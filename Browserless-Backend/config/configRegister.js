const fs = require("fs");
exports.blbeGetConfig = function() {
    let configObject;
    try {
      configObject = JSON.parse(fs.readFileSync("./Browserless-Backend/config/config.json", "utf-8"));
    } catch (err) {
      console.error(err);
    }
    finally{
      if (configObject instanceof Object){
        return configObject
      } else {
        return {
          "port":3000
        }
      }
    }
  }