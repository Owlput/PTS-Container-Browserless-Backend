const timetoolEntry = require('./tools/TimeTool')
const stitchEntry = require('./tools/stitch')
const helpEntry = require('./tools/help')

module.exports = function commandRouter(command,setPassthrough,setInside,write) {
  let splitted = command.split(/\s*\s\s*/).map((frag) => frag.trim());
  switch (splitted?.[0]) {
    case "time": {
      timetoolEntry(command,setPassthrough,setInside,write);
      break
    }
    case "stitch":{
      stitchEntry(command,setPassthrough,setInside,write)
      break
    }
    case "help":{
      helpEntry(setPassthrough)
      break
    }
    default: {
    }
  }
}
