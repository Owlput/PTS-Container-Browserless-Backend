const net = require("net");
const readline = require("readline");
const CommandCombo = require("./commandCombo");
const commandRouter = require("./commandRouter");
const blbeGetConfig = require("./config/configRegister");

let globalConfig = blbeGetConfig();

/*----------------------------------------*/
/* Start Browserless Backend(BLBE) server */
/*----------------------------------------*/
let blbe = net.createServer();
blbe.listen(globalConfig.port, () =>
  console.log(`Listening on port ${globalConfig.port}`)
); // Listening connections
blbe.on("connection", (socket) => {
  inputHandler(socket) //Process incoming requests
    .then(() => socket.destroy())
    .catch((err) => {
      console.error(err); //Error handler
      socket.destroy();
    });
});

async function inputHandler(socket) {
  let interf = readline.createInterface({
    input: socket,
    output: socket,
    prompt: "PBT>>",
  });
  write("Terminal connected");
  function write(text, prompt = true) {
    if (text) {
      socket.write(`${text}\r\n`);
    } else {
      socket.write(`\r`);
    }
    if (prompt) interf.prompt();
  }
  let history = {
    commandHistory: [],
    add(cmd) {
      if (this.commandHistory.length < 200) {
        this.commandHistory.push(cmd);
      } else {
        this.commandHistory.shift();
        this.commandHistory.push(cmd);
      }
    },
    clear() {
      this.commandHistory = [];
    },
    previous() {
      return this.commandHistory[this.commandHistory.length - 1];
    },
    index(index) {
      if (index <= this.commandHistory.length - 1 && index >= 0) {
        return this.commandHistory[index];
      } else {
        return "Invalid Index!";
      }
    },
  };
  let state = {
    passthrough: { progress() {} },
    inside: false,
  };
  function setPassthrough(target) {
    state.passthrough = target;
  }
  function setInside(bol) {
    state.inside = bol;
  }
  for await (let input of interf) {
    history.add(input);
    if (input === "$exit") {
      let exit = false;
      switch (state.inside) {
        case true: {
          write("Aborted.");
          state.inside = false;
          state.passthrough = { progress() {} };
          continue;
        }
        case false: {
          write("Press enter to exit the terminal");
          exit = true;
          break;
        }
      }
      state.inside = false;
      state.passthrough = { progress() {} };
      if (exit) return;
    }
    if (state.inside === false) {
      console.log("state:escaped");
      let command = new CommandCombo(input);
      commandRouter(command, setPassthrough, setInside, write);
      state.passthrough.progress(write, setInside, setPassthrough, command);
    } else if (state.inside === true) {
      console.log("state:inside");
      console.log(state.inputMemory);
      state.passthrough.progress(write, setInside, setPassthrough, input);
    } else {
      setInside(false);
      write("Internal error encountered, now exiting");
      throw new Error(
        `[ERROR@main}Invalid state "inside", received: ${state.inside}, expecting: boolean, now reset it to default: false.`
      );
    }
  }
}
