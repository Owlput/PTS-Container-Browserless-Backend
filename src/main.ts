import { Duplex } from "stream";
import net from "net";
import readline from "readline";
import confighandler from "./config/configRegister.js";
import CommandCombo from "./commandCombo"

let globalConfig = confighandler.blbeGetConfig();

/*----------------------------------------*/
/* Start Browserless Backend(BLBE) server */
/*----------------------------------------*/
let blbe = net.createServer();
blbe.listen(globalConfig.port, () =>
  console.log(`Listening on port ${globalConfig.port}`)
); // Listening connections
blbe.on("connection", (socket: Duplex) => {
  inputListener(socket) //Process incoming requests
    .then(() => socket.end)
    .catch((err) => {
      console.error(err); //Error handler
      socket.end();
    });
});

async function inputListener(socket: Duplex) {
  let interf = readline.createInterface({
    input: socket,
    output: socket,
    prompt: ">>",
  });
  write("Terminal connected");
  function write(text, prompt = true) {
    socket.write(`${text}\r\n`);
    if (prompt) interf.prompt();
  }
  let history = {
    commandHistory: [],
    add(cmd:CommandCombo) {
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
  for await (let input of interf) {
    switch (input) {
      case "^[[A": {
        write(history.previous());
      }
      case "exit": {
        return;
      }
      default: {
        write("Command not found, please check your input");
      }
    }
  }
}
