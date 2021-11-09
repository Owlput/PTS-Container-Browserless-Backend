module.exports = function helpEntry(command, setPassthrough) {
  switch (command.splitted[1]) {
    case "stitch": {
      setPassthrough(stitchHelp);
      break;
    }
    default: {
      setPassthrough(defaultHelp);
    }
  }
};
const defaultHelp = {
  id: "defaultHelp",
  progress(write, _, setPassthrough) {
    write(helpMessage.default);
    setPassthrough(defaultPassthrough);
  },
};
const stitchHelp = {
  id: "stitchHelp",
  progress(write, _, setPassthrough) {
    write(helpMessage.stitch);
    setPassthrough(defaultPassthrough);
  },
};
const helpMessage = {
  default: `  Ptilopsis Browserless Terminal
  Version: 20211031
  GitHub Repo:https://github.com/Owlput/PTS-Container-Browserless-Backend
        
  Commands avaliable:
    stitch
    time
    help
        
  Please type in the command you want to get help for using syntax "help command".
  Type "$exit" to disconnect`,

  stitch: `  Useage: stitch [FLAGS]
  Interactively stitching two input string

    -s simplified version without interactive guide
       example: stitch -s a b`,
};
const defaultPassthrough = {
  id: "defaultPassthrough",
  progress(write) {
    write();
  },
};
