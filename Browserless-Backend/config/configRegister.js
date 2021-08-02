const fs = require("fs");
exports.blbeGetConfig = function() {
    let configObject
    try {
      configObject = JSON.parse(fs.readFileSync("./Browserless-Backend/config/config.json", "utf-8"));
      
     }
  catch (err) {
      console.error(err);
      console.log("Failed to load configuations from config.json, use default value instead.")
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