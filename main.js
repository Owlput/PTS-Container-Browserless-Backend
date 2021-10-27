const { clear } = require("console");
const net = require("net");
const readline = require("readline");
const confighandler = require("./config/configRegister.js");

let globalConfig = confighandler.blbeGetConfig();

/*----------------------------------------*/
/* Start Browserless Backend(BLBE) server */
/*----------------------------------------*/
let blbe = net.createServer();
blbe.listen(globalConfig.port, () =>
  console.log(`Listening on port ${globalConfig.port}`)
); // Listening connections
blbe.on("connection", (socket) => {
  inputListener(socket) //Process incoming requests
    .then(() => socket.end)
    .catch((err) => {
      console.error(err); //Error handler
      socket.end();
    });
});

class CommandCombo {
  constructor(cmd) {
    this.commandCombo = cmd
  }
  length(){
    return this.commandCombo.length
  }
  add(command){
    this.commandCombo.push(command)
  }
  revive(){
    
  }
}
async function inputListener(socket) {
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
    previous(){
      return this.commandHistory[this.commandHistory.length -1]
    },
    index(index){
      if(index <= this.commandHistory.length-1 && index >=0){
      return this.commandHistory[index]
    } else {
      return "Invalid Index!"
    }}
  };
  function commandSplit(inputCommand) {
    let letters = "";
    inputCommand = inputCommand.toLowerCase() + " ";
    let commands = [];
    for (let letter of inputCommand) {
      if (letter !== " ") {
        letters += letter;
      } else if (letter === " ") {
        commands.push(letters);
        letters = "";
      } else {
        commands.push(letters);
      }
    }
    history.add(commands)
    return commands;
  }
  for await (let input of interf) {
    let command = commandSplit(input);
    switch (command[0]) {
      case "time": {
        switch (command[1]) {
          default: {
            write(Date.now().toLocaleString());
          }
        }
        break;
      }
      case "^[[A":{
        write(history.previous())
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
