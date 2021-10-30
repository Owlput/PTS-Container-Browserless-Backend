const CommandCombo = require("../commandCombo");

module.exports = function stitchEntry(cmd, setPassthrough, setInside) {
  let command = new CommandCombo(cmd);
  setInside(true);
  if (command.splitted[0] === "stitch") {
    setPassthrough(stitch);
  }
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
          checkNoting(this.mem,write);
          this.stage = "checking";
          return
        }
        case 2:{
          this.mem[1]=input
          this.checking = -1
          checkNoting(this.mem,write);
          this.stage = "checking"
          return
        }
        case 0:{
          this.mem[0]=input
          write("Please re-enter text2")
          this.checking = 2
          return
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
        checkNoting(this.mem,write);
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
            this.stage = "0"
            this.mem=["",""]
            this.checking=-1
            setInside(false)
            setPassthrough(defaultPassthrough)
          }
        }
      }
    }
  },
};
function checkNoting(mem,write){
  write(`Please check your input
  text1:${mem[0]} , text2:${mem[1]}\n
  Answer "y" to continue, "?text" for correcting all, \n
  "?text1" for correcting text1, "?text2" for correcting text2.
`);
}
const defaultPassthrough = { progress() {} }