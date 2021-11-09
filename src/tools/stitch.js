module.exports = function stitchEntry(command, setPassthrough, setInside) {
  setInside(true);
  if (!command.splitted[1]) {
    setPassthrough(stitch);
  } else if (command.flags.has("-s")) setPassthrough(stitch_s);
};
let stitch = {
  stage: "0",
  mem: ["", ""],
  checking: -1,
  progress(write, setInside, setPassthrough, input) {
    if (input === "$exit") {
      setInside(false);
      setPassthrough(defaultPassthrough);
      return;
    }
    if (this.checking !== -1) {
      switch (this.checking) {
        case 1: {
          this.mem[0] = input;
          this.checking = -1;
          checkNoting(this.mem, write);
          this.stage = "checking";
          return;
        }
        case 2: {
          this.mem[1] = input;
          this.checking = -1;
          checkNoting(this.mem, write);
          this.stage = "checking";
          return;
        }
        case 0: {
          this.mem[0] = input;
          write("Please re-enter text2");
          this.checking = 2;
          return;
        }
      }
    }
    switch (this.stage) {
      case "0": {
        write("Please enter text1");
        this.stage = "1";
        break;
      }
      case "1": {
        this.mem[0] = input;
        write("Please enter text2");
        this.stage = "2";
        break;
      }
      case "2": {
        this.mem[1] = input;
        checkNoting(this.mem, write);
        this.stage = "checking";
        break;
      }
      case "checking": {
        switch (input) {
          case "?text1": {
            write("Please re-enter text1");
            this.checking = 1;
            break;
          }
          case "?text2": {
            write("Please re-enter text2");
            this.checking = 2;
            break;
          }
          case "?text": {
            write("Please re-enter text1");
            this.checking = 0;
            break;
          }
          case "y": {
            write(`${this.mem[0] + this.mem[1]}`);
            this.stage = "0";
            this.mem = ["", ""];
            this.checking = -1;
            setInside(false);
            setPassthrough(defaultPassthrough);
          }
        }
      }
    }
  },
};
let stitch_s = {
  progress(write, setInside, setPassthrough, command) {
    setInside(false);
    write(`${command.splitted[2] + command.splitted[3]}`);
    setPassthrough(defaultPassthrough);
  },
};
function checkNoting(mem, write) {
  write(`Please check your input
  text1:${mem[0]} , text2:${mem[1]}
  Answer "y" to continue, "?text" for correcting all, 
  "?text1" for correcting text1, "?text2" for correcting text2.`);
}
const defaultPassthrough = {
  progress(write) {
    write();
  },
};
