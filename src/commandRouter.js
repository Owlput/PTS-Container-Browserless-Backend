const timetoolEntry = require("./tools/TimeTool");
const stitchEntry = require("./tools/stitch");
const helpEntry = require("./tools/help");

module.exports = function commandRouter(
  command,
  setPassthrough,
  setInside,
  write
) {
  switch (command.splitted?.[0]) {
    case "time": {
      timetoolEntry(command, setPassthrough, setInside, write);
      break;
    }
    case "stitch": {
      stitchEntry(command, setPassthrough, setInside, write);
      break;
    }
    case "help": {
      helpEntry(command,setPassthrough);
      break;
    }
    default: {
      if (!command.splitted[0]) {
        setPassthrough({
          progress(write) {
            write();
          },
        });
      } else {
        setPassthrough({
          progress(write) {
            write(
              `Unknown command "${command.rawInput}", please type "help" for more info`
            );
          },
        });
      }
    }
  }
};
